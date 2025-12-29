from DrivingInterface.drive_controller import DrivingController
import math

class DrivingClient(DrivingController):
    def __init__(self):
        # =========================================================== #
        #  Area for member variables =============================== #
        # =========================================================== #
        # Editing area starts from here
        self.is_debug = False
        self.enable_api_control = True 
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

        # -----------------------------------------------------------
        # 1. 기본 주행 전략: 풀악셀 & 노브레이크
        # -----------------------------------------------------------
        # Track 1은 완만한 커브 위주이므로 브레이크를 아예 뺍니다.
        car_controls.throttle = 1
        car_controls.brake = 0

        # -----------------------------------------------------------
        # 2. 조향 (Steering) 계산
        # -----------------------------------------------------------
        # 가이드에 따르면 track_forward_angles는 전방 200m(20개 구간) 정보를 줍니다[cite: 408].
        # 고속 주행 시 아주 멀리(150m~190m)를 봐야 흔들리지 않습니다.
        
        # 속도에 따라 보는 지점을 다르게 설정 (Look-ahead Point)
        if sensing_info.speed < 100:
            target_idx = 5  # 저속: 50m 앞
        elif sensing_info.speed < 150:
            target_idx = 10 # 중속: 100m 앞
        else:
            target_idx = 17 # 고속: 170m 앞 (거의 끝)

        # 목표 각도 (도로가 휘어지는 정도)
        # 리스트 인덱스 범위 초과 방지를 위해 min 처리
        target_angle = sensing_info.track_forward_angles[min(target_idx, len(sensing_info.track_forward_angles)-1)]
        
        # 내 차의 현재 각도
        current_angle = sensing_info.moving_angle

        # -----------------------------------------------------------
        # 3. 중앙 유지 보정 (패널티 방지 핵심)
        # -----------------------------------------------------------
        # 도로 폭은 16m(중앙에서 8m)입니다.
        # 인코스 욕심내다 8m 넘어가면 감속 패널티(Brake 0.9) 먹습니다.
        # 따라서 to_middle 값이 커지면(가장자리에 가면) 핸들을 중앙으로 강력하게 꺾습니다.
        
        middle_correction = sensing_info.to_middle / 3.0 # 숫자가 작을수록 중앙 복귀 성향이 강함

        # 코너링 시 핸들링 민감도 조절
        # 속도가 빠를수록 핸들을 살살 돌려야 함 (안 그러면 스핀)
        steer_sensitivity = 0.8
        if sensing_info.speed > 180:
            steer_sensitivity = 0.5 

        # 최종 조향값 계산
        # (목표각도 - 내각도) -> 도로 흐름 따라가기
        # - middle_correction -> 중앙으로 돌아오기
        steer_val = ((target_angle - current_angle) / 35.0) * steer_sensitivity - (middle_correction / 15.0)

        # -----------------------------------------------------------
        # 4. 특수 상황 처리 (충돌 및 코너)
        # -----------------------------------------------------------
        
        # 만약 차가 도로 밖으로 나가려 하면(7m 이상) 강제로 안쪽으로 꺾음 (패널티 구역 회피)
        if abs(sensing_info.to_middle) > 7.0:
            if sensing_info.to_middle > 0: # 오른쪽 벽 근처
                steer_val = -0.5
            else: # 왼쪽 벽 근처
                steer_val = 0.5
            # 이때만 살짝 감속해서 그립 회복
            car_controls.throttle = 0.8 

        # 충돌 시 후진 로직 (기존 유지)
        if sensing_info.collided:
            car_controls.throttle = -1
            car_controls.brake = 0
            # 반대 방향으로 핸들 꺾어 탈출
            if sensing_info.to_middle > 0:
                car_controls.steering = -1
            else:
                car_controls.steering = 1
        else:
            # 정상 주행 시 조향값 적용
            # -1 ~ 1 사이로 값 제한 [cite: 543]
            car_controls.steering = max(-1.0, min(1.0, steer_val))

        # 디버그 출력
        if self.is_debug:
            print(f"Speed: {sensing_info.speed}, Steer: {car_controls.steering:.2f}")

        #
        # Editing area ends
        # ==========================================================#
        return car_controls

    def set_player_name(self):
        player_name = "SpeedRacer_V3"
        return player_name


if __name__ == '__main__':
    print("[MyCar] Start Bot! (PYTHON)")
    client = DrivingClient()
    return_code = client.run()
    print("[MyCar] End Bot! (PYTHON)")
    exit(return_code)