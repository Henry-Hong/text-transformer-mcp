#!/usr/bin/env node
/**
 * Text Transformer MCP Server
 * =============================
 *
 * MCP 사용법:
 * -----------
 *
 * 1. Cursor 설정
 *    ~/.cursor/mcp.json 파일에 다음을 추가:
 *
 *    {
 *      "mcpServers": {
 *        "text-transformer": {
 *          "command": "node",
 *          "args": ["/Users/user/playground/my-mcp/dist/index.js"]
 *        }
 *      }
 *    }
 *
 * 2. Claude Desktop 설정
 *    ~/.config/claude_desktop_config.json 파일에 다음을 추가:
 *
 *    {
 *      "mcpServers": {
 *        "text-transformer": {
 *          "command": "node",
 *          "args": ["/Users/user/playground/my-mcp/dist/index.js"]
 *        }
 *      }
 *    }
 *
 * 3. 빌드 및 실행
 *    - npm run build : TypeScript 컴파일
 *    - npm start : 서버 실행 (디버깅용)
 *
 * 4. 사용 가능한 Tools:
 *    - lowercase: 소문자 변환
 *    - uppercase: 대문자 변환
 *    - reverse: 문자열 뒤집기
 *    - isPalindrome: 팰린드롬 확인
 *    - countWords: 단어 수 세기
 *    - countCharacters: 글자 수 세기
 *    - trim: 공백 제거
 *    - capitalize: 각 단어 첫 글자 대문자
 */
export {};
//# sourceMappingURL=index.d.ts.map