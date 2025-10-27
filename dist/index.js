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
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// Create MCP server
const server = new McpServer({
    name: "text-transformer-mcp",
    version: "1.0.0",
});
// 1. Lowercase tool - 소문자로 변환
server.registerTool("lowercase", {
    title: "Convert to Lowercase",
    description: "Convert text to lowercase",
    inputSchema: {
        text: z.string().describe("Text to convert to lowercase"),
    },
    outputSchema: {
        result: z.string(),
    },
}, async ({ text }) => {
    const result = text.toLowerCase();
    const output = { result };
    return {
        content: [{ type: "text", text: result }],
        structuredContent: output,
    };
});
// 2. Uppercase tool - 대문자로 변환
server.registerTool("uppercase", {
    title: "Convert to Uppercase",
    description: "Convert text to uppercase",
    inputSchema: {
        text: z.string().describe("Text to convert to uppercase"),
    },
    outputSchema: {
        result: z.string(),
    },
}, async ({ text }) => {
    const result = text.toUpperCase();
    const output = { result };
    return {
        content: [{ type: "text", text: result }],
        structuredContent: output,
    };
});
// 3. Reverse tool - 문자열 뒤집기
server.registerTool("reverse", {
    title: "Reverse Text",
    description: "Reverse the order of characters in text",
    inputSchema: {
        text: z.string().describe("Text to reverse"),
    },
    outputSchema: {
        result: z.string(),
    },
}, async ({ text }) => {
    const result = text.split("").reverse().join("");
    const output = { result };
    return {
        content: [{ type: "text", text: result }],
        structuredContent: output,
    };
});
// 4. Is Palindrome tool - 팰린드롬 확인
server.registerTool("isPalindrome", {
    title: "Check if Palindrome",
    description: "Check if text is a palindrome (reads the same forwards and backwards)",
    inputSchema: {
        text: z.string().describe("Text to check"),
        ignoreSpaces: z
            .boolean()
            .optional()
            .describe("Ignore spaces and punctuation (default: false)"),
    },
    outputSchema: {
        isPalindrome: z.boolean(),
        original: z.string(),
        reversed: z.string(),
    },
}, async ({ text, ignoreSpaces = false }) => {
    let processedText = text;
    if (ignoreSpaces) {
        // Remove spaces, punctuation and convert to lowercase for comparison
        processedText = text.toLowerCase().replace(/[^a-z0-9]/g, "");
    }
    const reversed = processedText.split("").reverse().join("");
    const isPalindrome = processedText === reversed;
    const output = {
        isPalindrome,
        original: processedText,
        reversed,
    };
    return {
        content: [
            {
                type: "text",
                text: isPalindrome
                    ? `Yes, "${text}" is a palindrome!`
                    : `No, "${text}" is not a palindrome.`,
            },
        ],
        structuredContent: output,
    };
});
// 5. Count Words tool - 단어 수 세기
server.registerTool("countWords", {
    title: "Count Words",
    description: "Count the number of words in text",
    inputSchema: {
        text: z.string().describe("Text to count words in"),
    },
    outputSchema: {
        wordCount: z.number(),
        words: z.array(z.string()),
    },
}, async ({ text }) => {
    // Split by whitespace and filter out empty strings
    const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
    const wordCount = words.length;
    const output = { wordCount, words };
    return {
        content: [
            {
                type: "text",
                text: `Word count: ${wordCount}\nWords: ${words.join(", ")}`,
            },
        ],
        structuredContent: output,
    };
});
// 6. Count Characters tool - 글자 수 세기
server.registerTool("countCharacters", {
    title: "Count Characters",
    description: "Count the number of characters in text",
    inputSchema: {
        text: z.string().describe("Text to count characters in"),
        includeSpaces: z
            .boolean()
            .optional()
            .describe("Include spaces in count (default: true)"),
    },
    outputSchema: {
        totalCharacters: z.number(),
        withoutSpaces: z.number(),
        spaces: z.number(),
    },
}, async ({ text, includeSpaces = true }) => {
    const totalCharacters = text.length;
    const withoutSpaces = text.replace(/\s/g, "").length;
    const spaces = totalCharacters - withoutSpaces;
    const output = {
        totalCharacters,
        withoutSpaces,
        spaces,
    };
    const displayCount = includeSpaces ? totalCharacters : withoutSpaces;
    return {
        content: [
            {
                type: "text",
                text: `Characters: ${displayCount}\n` +
                    `(Total: ${totalCharacters}, Without spaces: ${withoutSpaces}, Spaces: ${spaces})`,
            },
        ],
        structuredContent: output,
    };
});
// 7. Trim tool - 공백 제거
server.registerTool("trim", {
    title: "Trim Whitespace",
    description: "Remove leading and trailing whitespace from text",
    inputSchema: {
        text: z.string().describe("Text to trim"),
    },
    outputSchema: {
        result: z.string(),
        removedCharacters: z.number(),
    },
}, async ({ text }) => {
    const result = text.trim();
    const removedCharacters = text.length - result.length;
    const output = { result, removedCharacters };
    return {
        content: [
            {
                type: "text",
                text: `Trimmed: "${result}"\nRemoved ${removedCharacters} whitespace character(s)`,
            },
        ],
        structuredContent: output,
    };
});
// 8. Capitalize tool - 각 단어 첫 글자 대문자
server.registerTool("capitalize", {
    title: "Capitalize Words",
    description: "Capitalize the first letter of each word",
    inputSchema: {
        text: z.string().describe("Text to capitalize"),
    },
    outputSchema: {
        result: z.string(),
    },
}, async ({ text }) => {
    const result = text
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    const output = { result };
    return {
        content: [{ type: "text", text: result }],
        structuredContent: output,
    };
});
// Connect via stdio transport
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    // Log to stderr since stdout is used for MCP communication
    console.error("Text Transformer MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
