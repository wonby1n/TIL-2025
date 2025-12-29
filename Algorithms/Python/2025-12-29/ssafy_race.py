from DrivingInterface.drive_controller import DrivingController
import math

# 전역 변수
col = False

class DrivingClient(DrivingController):
    def __init__(self):
        # =========================================================== #
        #  Area for member variables =============================== #
        # =========================================================== #
        # Editing area starts from here
        self.col = col
        self.is_debug = False # 디버그 로그가 너무 많으면 느려질 수 있어 False 권장

        # api or keyboard
        self.enable_api_control = True # True(Controlled by code) /False(Controlled by keyboard)
        super().set_enable_api_control(self.enable_api_control)

        #
        # Editing area ends
        # ==========================================================#
        super().__init__()

    
    def control_driving(self, car_controls, sensing_info):

        # =========================================================== #
        # Area for writing code about driving rule ================= #
        # =========================================================== #
        # Editing area starts from here
        #

        # 디버그 정보 출력 (필요시 is_debug를 True로 변경)
        if self.is_debug:
            print(f"[MyCar] Speed: {sensing_info.speed}, Angle: {sensing_info.moving_angle}")

        # -----------------------------------------------------------
        # 1. 트랙의 좌표(Way Points) 계산
        # -----------------------------------------------------------
        # 현재 차량의 경로를 계산하기 위한 좌표 변환
        way_points = []
        # to_middle을 이용해 현재 위치의 Y좌표 추정
        # (피타고라스 정리 응용이지만, 단순화를 위해 근사값 사용 가능)
        dist_to_first = sensing_info.distance_to_way_points[0]
        curr_to_mid = sensing_info.to_middle
        
        # 간단한 예외처리: 근호 안이 음수가 되는 것을 방지
        val = dist_to_first**2 - curr_to_mid**2
        y = math.sqrt(val) if val > 0 else 0
        
        way_points.append({'x': 0, 'y': y})
        
        # 전방 19개 지점의 좌표 계산
        for i in range(19):
            # 각도와 거리를 이용해 상대 좌표(x, y) 계산
            angle_rad = math.radians(sensing_info.track_forward_angles[i])
            dist = 10 # 각 웨이포인트 간의 대략적 거리 (상수값 가정)
            
            x = way_points[i]['x'] + (dist * math.sin(angle_rad))
            y = way_points[i]['y'] + (dist * math.cos(angle_rad))
            way_points.append({'x': x, 'y': y})

        # -----------------------------------------------------------
        # 2. 목표 지점(Target Point) 선정
        # -----------------------------------------------------------
        # 속도가 빠를수록 더 멀리 봐야 합니다. (Look-ahead Distance)
        # 베이직 맵은 커브가 일정하므로 멀리 볼수록 주행이 부드러워집니다.
        
        if sensing_info.speed < 60:
            ref_idx = 3  # 저속에서는 가까운 곳
        elif sensing_info.speed < 120:
            ref_idx = 8  # 중속
        else:
            ref_idx = 15 # 고속에서는 아주 멀리 봄 (최대 19까지 가능)

        # 목표 지점 좌표
        target_x = way_points[ref_idx]['x']
        target_y = way_points[ref_idx]['y']

        # -----------------------------------------------------------
        # 3. 조향각(Steering) 계산 (Pure Pursuit 알고리즘 단순화)
        # -----------------------------------------------------------
        # 목표 지점까지의 각도를 계산
        # target_x - to_middle을 하는 이유는 도로 중앙을 목표로 하기 위함
        target_angle = math.atan2(target_x - sensing_info.to_middle, target_y)
        
        # 현재 차량의 진행 각도 보정
        current_angle = math.radians(sensing_info.moving_angle)
        
        # 조향 값 결정 (상수 1.5는 민감도, 필요시 조절)
        steer_val = (target_angle - current_angle) * 1.5
        
        # 조향값 클램핑 (-1 ~ 1 사이로 제한)
        if steer_val > 1: steer_val = 1
        if steer_val < -1: steer_val = -1
        
        car_controls.steering = steer_val

        # -----------------------------------------------------------
        # 4. 가속 및 브레이크 (Throttle & Brake)
        # -----------------------------------------------------------
        # 기본적으로 풀악셀
        car_controls.throttle = 1
        car_controls.brake = 0

        # 속도가 너무 빠르고(200km/h 이상) + 커브가 급격할 때만 살짝 감속
        # 베이직 맵에서는 거의 걸리지 않음
        angle_diff = abs(sensing_info.track_forward_angles[ref_idx] - sensing_info.moving_angle)
        
        if sensing_info.speed > 200 and angle_diff > 10:
            car_controls.throttle = 0.8
            car_controls.brake = 0.1  # 아주 살짝만 제동

        # -----------------------------------------------------------
        # 5. 충돌 처리 (Collision Recovery)
        # -----------------------------------------------------------
        # 기존 로직 유지하되 간소화 (후진 탈출)
        if sensing_info.collided:
            self.col = True
            car_controls.brake = 0
            car_controls.throttle = -1 # 후진
            
            # 충돌 시 핸들을 반대로 꺾어 탈출 시도
            if sensing_info.to_middle > 0:
                car_controls.steering = -1
            else:
                car_controls.steering = 1

        if self.col:
            car_controls.throttle = -1
            # 충돌 상태 해제 조건: 속도가 충분히 줄거나 방향이 잡혔을 때
            # 여기서는 단순히 뒤로 좀 물러나면 해제하는 로직
            if not sensing_info.collided and sensing_info.speed > -5:
                 # 뒤로 조금 갔다고 판단되면 다시 전진 모드
                 self.col = False
                 car_controls.throttle = 1

        # 디버그 출력
        if self.is_debug:
            print(f"Steer: {car_controls.steering:.2f}, Throttle: {car_controls.throttle}, TargetIdx: {ref_idx}")

        #
        # Editing area ends
        # ==========================================================#
        return car_controls


    # ============================
    # If you have NOT changed the <settings.json> file
    # ===> player_name = ""
    #
    # If you changed the <settings.json> file
    # ===> player_name = "My car name" (specified in the json file)  ex) Car1
    # ============================
    def set_player_name(self):
        player_name = "SpeedRacer"
        return player_name


if __name__ == '__main__':
    print("[MyCar] Start Bot! (PYTHON)")

    client = DrivingClient()
    return_code = client.run()

    print("[MyCar] End Bot! (PYTHON)")

    exit(return_code)