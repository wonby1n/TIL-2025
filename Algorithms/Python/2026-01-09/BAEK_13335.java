import java.io.*;
import java.util.*;

public class BAEK_13335 {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();
		StringTokenizer st;

        // 첫 번째 줄 입력 받기
        st = new StringTokenizer(br.readLine());
        // 다리를 건너는 트럭의 수
        int n = Integer.parseInt(st.nextToken());
        // 다리의 길이
        int w = Integer.parseInt(st.nextToken());
        // 다리의 최대하중 (무조건 10 이상으로 주어짐)
        int L = Integer.parseInt(st.nextToken());
        
        // 두 번째 줄 입력 받기
        st = new StringTokenizer(br.readLine());
        // 1차원 리스트 정의
        int[] arr = new int[n];
        // 트럭의 무게 입력받기
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        
    }
}
