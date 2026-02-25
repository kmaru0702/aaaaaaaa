# Calculator Web App

간단한 사칙연산 계산기입니다.

## 로컬 실행

브라우저에서 `index.html` 파일을 직접 열면 바로 동작합니다.

## GitHub Pages 배포 방법

1. 이 저장소를 GitHub에 푸시합니다.
2. 저장소 **Settings → Pages → Build and deployment → Source** 를 `GitHub Actions`로 설정합니다.
3. `main` 브랜치에 푸시하면 `.github/workflows/deploy-pages.yml` 워크플로우가 실행되어 배포됩니다.
4. 배포 완료 후 `https://<github-id>.github.io/<repo-name>/` 주소에서 확인할 수 있습니다.
