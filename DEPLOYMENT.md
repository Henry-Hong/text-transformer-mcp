# 배포 가이드

## 📦 npm 배포 방법

### 1. npm 계정 준비

```bash
# npm 로그인 (처음 사용 시)
npm login
```

### 2. 프로젝트 빌드

```bash
# 빌드 실행
npm run build

# 결과 확인
ls -la dist/
```

### 3. 배포 전 테스트

```bash
# 로컬에서 테스트
npm pack
npm install -g ./text-transformer-mcp-1.0.0.tgz
```

### 4. 배포 실행

```bash
# 배포
npm publish

# 또는 테스트 배포 (터미널 설치 불가, 확인만 가능)
npm publish --dry-run
```

### 5. 버전 업데이트

```bash
# 버전 수정
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.0 -> 1.1.0
npm version major   # 1.0.0 -> 2.0.0
```

## 🌐 GitHub 배포 방법

### 1. GitHub 저장소 생성

```bash
# Git 초기화 (이미 되어 있다면 생략)
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소 추가
git remote add origin https://github.com/yourusername/text-transformer-mcp.git
git push -u origin main
```

### 2. GitHub에서 직접 설치

사용자는 다음과 같이 설치할 수 있습니다:

```bash
# 직접 다운로드 및 빌드
git clone https://github.com/yourusername/text-transformer-mcp.git
cd text-transformer-mcp
npm install
npm run build
```

그리고 `mcp.json`에 추가:

```json
{
  "mcpServers": {
    "text-transformer": {
      "command": "node",
      "args": ["/full/path/to/text-transformer-mcp/dist/index.js"]
    }
  }
}
```

### 3. GitHub Actions로 자동 배포 설정 (선택사항)

`.github/workflows/publish.yml` 파일 생성:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          registry-url: "https://registry.npmjs.org"
      - run: npm install
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## 🚀 배포 체크리스트

- [ ] `package.json`의 `name`이 npm에서 사용 가능한지 확인
- [ ] `package.json`의 `repository` URL을 실제 저장소로 수정
- [ ] README.md에 사용법 추가 완료
- [ ] `.gitignore`에 불필요한 파일 제외 설정
- [ ] `npm run build` 후 정상 작동 확인
- [ ] `npm publish --dry-run`으로 배포 전 시뮬레이션
- [ ] npm 배포 완료 후 설치 테스트

## 📝 배포 후 사용자 가이드

배포가 완료되면 사용자는 다음과 같이 설치할 수 있습니다:

### npx로 간편하게 (추천)

```json
{
  "mcpServers": {
    "text-transformer": {
      "command": "npx",
      "args": ["-y", "text-transformer-mcp"]
    }
  }
}
```

### 전역 설치 후

```bash
npm install -g text-transformer-mcp
```

```json
{
  "mcpServers": {
    "text-transformer": {
      "command": "text-transformer-mcp"
    }
  }
}
```

## 🐛 문제 해결

### npm 배포 오류

- 패키지 이름 중복: `package.json`의 `name` 변경
- 버전 중복: `npm version patch`로 버전 증가 후 재배포
- 권한 오류: `npm login` 확인

### MCP 연결 오류

- `mcp.json` 경로 확인
- Node.js 버전 확인 (>=18)
- 빌드 확인 (`dist/index.js` 존재 여부)
