# text-transformer-mcp

텍스트 변환 도구를 제공하는 MCP (Model Context Protocol) 서버입니다.

## ⚙️ 설정

### Cursor 설정

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

### Claude Desktop 설정

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

or

```
claude mcp add text-transformer -- npx -y text-transformer-mcp
```

## 🛠️ 사용 가능한 도구

1. **lowercase** - 텍스트를 소문자로 변환
2. **uppercase** - 텍스트를 대문자로 변환
3. **reverse** - 문자열의 순서를 뒤집기
4. **isPalindrome** - 팰린드롬 여부 확인
5. **countWords** - 단어 수 세기
6. **countCharacters** - 글자 수 세기
7. **trim** - 앞뒤 공백 제거
8. **capitalize** - 각 단어의 첫 글자를 대문자로

## 📝 예제

MCP를 설정한 후 Cursor나 Claude Desktop에서 다음과 같이 사용할 수 있습니다:

```
"Hello World"를 대문자로 변환해줘
```

```
"racecar"가 팰린드롬인지 확인해줘
```

## 📄 라이선스

MIT
