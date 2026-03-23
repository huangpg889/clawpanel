/**
 * 共享模型预设配置
 * models.js 和 assistant.js 共用，只需维护一套数据
 */

// API 接口类型选项
export const API_TYPES = [
    {value: 'openai-completions', label: 'OpenAI 兼容 (最常用)'},
    {value: 'anthropic-messages', label: 'Anthropic 原生'},
    {value: 'openai-responses', label: 'OpenAI Responses'},
    {value: 'google-gemini', label: 'Google Gemini'},
]

// 服务商快捷预设
export const PROVIDER_PRESETS = [
    {
        key: 'minimax',
        label: 'MiniMax',
        baseUrl: 'https://api.minimaxi.com/anthropic',
        api: 'anthropic-messages',
        authHeader: 'true'
    },
    {
        key: 'deepseek',
        label: 'DeepSeek',
        baseUrl: 'https://api.deepseek.com/v1',
        api: 'openai-completions'
    },
    {
        key: 'qwen',
        label: '千问',
        baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        api: 'openai-completions'
    },
    {
        key: 'volcengine',
        label: '火山引擎',
        baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
        api: 'openai-completions'
    },
    {
        key: 'volcengine_plan',
        label: '火山引擎Coding Plan',
        baseUrl: 'https://ark.cn-beijing.volces.com/api/coding',
        api: 'anthropic-messages'
    },
    {
        key: 'moonshot',
        label: 'Moonshot',
        baseUrl: 'https://api.moonshot.cn/v1',
        api: 'openai-completions'
    },
]

// gpt.qt.cool 推广配置
export const QTCOOL = {
    baseUrl: 'https://gpt.qt.cool/v1',
    defaultKey: 'sk-0JDu7hyc51ZKD4iNebpFu07EUEhXmVVc',
    site: 'https://gpt.qt.cool/',
    usageUrl: 'https://gpt.qt.cool/user?key=',
    providerKey: 'qtcool',
    api: 'openai-completions',
    models: []  // 始终从 API 动态获取最新模型列表
}

// 常用模型预设（按服务商分组）
export const MODEL_PRESETS = {
    minimax: [
        {
            "id": "MiniMax-M2.5",
            "name": "MiniMax M2.5",
            "reasoning": true,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0.3,
                "output": 1.2,
                "cacheRead": 0.03,
                "cacheWrite": 0.12
            },
            "contextWindow": 200000,
            "maxTokens": 8192,
            "api": "anthropic-messages"
        },
        {
            "id": "MiniMax-VL-01",
            "name": "MiniMax VL 01",
            "reasoning": false,
            "input": [
                "text",
                "image"
            ],
            "cost": {
                "input": 0.3,
                "output": 1.2,
                "cacheRead": 0.03,
                "cacheWrite": 0.12
            },
            "contextWindow": 200000,
            "maxTokens": 8192
        },
        {
            "id": "MiniMax-M2.5-highspeed",
            "name": "MiniMax M2.5 Highspeed",
            "reasoning": true,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0.3,
                "output": 1.2,
                "cacheRead": 0.03,
                "cacheWrite": 0.12
            },
            "contextWindow": 200000,
            "maxTokens": 8192
        }
    ],
    deepseek: [
        {id: 'deepseek-chat', name: 'DeepSeek V3', contextWindow: 64000},
        {id: 'deepseek-reasoner', name: 'DeepSeek R1', contextWindow: 64000, reasoning: true},
    ],
    qwen: [
        {
            "id": "qwen3.5-plus",
            "name": "qwen3.5-plus",
            "reasoning": false,
            "input": [
                "text",
                "image"
            ],
            "cost": {
                "input": 0,
                "output": 0,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 1000000,
            "maxTokens": 65536,
            "compat": {
                "thinkingFormat": "qwen"
            },
            "api": "openai-completions"
        },
        {
            "id": "qwen3-max-2026-01-23",
            "name": "qwen3-max-2026-01-23",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0,
                "output": 0,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 262144,
            "maxTokens": 65536,
            "compat": {
                "thinkingFormat": "qwen"
            },
            "api": "openai-completions"
        },
        {
            "id": "qwen3-coder-next",
            "name": "qwen3-coder-next",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0,
                "output": 0,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 262144,
            "maxTokens": 65536,
            "api": "openai-completions"
        },
        {
            "id": "qwen3-coder-plus",
            "name": "qwen3-coder-plus",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0,
                "output": 0,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 1000000,
            "maxTokens": 65536,
            "api": "openai-completions"
        },
        {
            "id": "MiniMax-M2.5",
            "name": "MiniMax-M2.5",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0,
                "output": 0,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 196608,
            "maxTokens": 32768,
            "api": "openai-completions"
        },
        {
            "id": "glm-5",
            "name": "glm-5",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0,
                "output": 0,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 202752,
            "maxTokens": 16384,
            "compat": {
                "thinkingFormat": "qwen"
            },
            "api": "openai-completions"
        },
        {
            "id": "glm-4.7",
            "name": "glm-4.7",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0,
                "output": 0,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 202752,
            "maxTokens": 16384,
            "compat": {
                "thinkingFormat": "qwen"
            },
            "api": "openai-completions"
        },
        {
            "id": "kimi-k2.5",
            "name": "kimi-k2.5",
            "reasoning": false,
            "input": [
                "text",
                "image"
            ],
            "cost": {
                "input": 0,
                "output": 0,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 262144,
            "maxTokens": 32768,
            "compat": {
                "thinkingFormat": "qwen"
            },
            "api": "openai-completions"
        }
    ],
    volcengine: [
        {
            "id": "doubao-seed-code-preview-251028",
            "name": "doubao-seed-code-preview-251028",
            "reasoning": false,
            "input": [
                "text",
                "image"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 256000,
            "maxTokens": 4096
        },
        {
            "id": "doubao-seed-1-8-251228",
            "name": "Doubao Seed 1.8",
            "reasoning": false,
            "input": [
                "text",
                "image"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 256000,
            "maxTokens": 4096
        },
        {
            "id": "kimi-k2-5-260127",
            "name": "Kimi K2.5",
            "reasoning": false,
            "input": [
                "text",
                "image"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 256000,
            "maxTokens": 4096
        },
        {
            "id": "glm-4-7-251222",
            "name": "GLM 4.7",
            "reasoning": false,
            "input": [
                "text",
                "image"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 4096
        },
        {
            "id": "deepseek-v3-2-251201",
            "name": "DeepSeek V3.2",
            "reasoning": false,
            "input": [
                "text",
                "image"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 128000,
            "maxTokens": 4096
        }
    ],
    volcengine_plan: [
        {
            "id": "ark-code-latest",
            "name": "Ark Coding Plan",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 256000,
            "maxTokens": 4096
        },
        {
            "id": "doubao-seed-code",
            "name": "Doubao Seed Code",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 256000,
            "maxTokens": 4096
        },
        {
            "id": "glm-4.7",
            "name": "GLM 4.7 Coding",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 200000,
            "maxTokens": 4096
        },
        {
            "id": "kimi-k2-thinking",
            "name": "Kimi K2 Thinking",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 256000,
            "maxTokens": 4096
        },
        {
            "id": "kimi-k2.5",
            "name": "Kimi K2.5 Coding",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 256000,
            "maxTokens": 4096
        },
        {
            "id": "doubao-seed-code-preview-251028",
            "name": "Doubao Seed Code Preview",
            "reasoning": false,
            "input": [
                "text"
            ],
            "cost": {
                "input": 0.0001,
                "output": 0.0002,
                "cacheRead": 0,
                "cacheWrite": 0
            },
            "contextWindow": 256000,
            "maxTokens": 4096
        }
    ],
    moonshot: [
    {
        "id": "kimi-k2.5",
        "name": "Kimi K2.5",
        "reasoning": false,
        "input": [
            "text",
            "image"
        ],
        "cost": {
            "input": 0,
            "output": 0,
            "cacheRead": 0,
            "cacheWrite": 0
        },
        "contextWindow": 256000,
        "maxTokens": 8192,
        "api": "openai-completions"
    }
],
    openai: [
    {id: 'gpt-4o', name: 'GPT-4o', contextWindow: 128000},
    {id: 'gpt-4o-mini', name: 'GPT-4o Mini', contextWindow: 128000},
    {id: 'o3-mini', name: 'o3 Mini', contextWindow: 200000, reasoning: true},
],
    anthropic: [
        {id: 'claude-sonnet-4-5-20250514', name: 'Claude Sonnet 4.5', contextWindow: 200000},
        {id: 'claude-haiku-3-5-20241022', name: 'Claude Haiku 3.5', contextWindow: 200000},
    ],
    google: [
        {id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', contextWindow: 1000000, reasoning: true},
        {id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', contextWindow: 1000000},
    ],
    ollama: [
        {id: 'qwen2.5:7b', name: 'Qwen 2.5 7B', contextWindow: 32768},
        {id: 'llama3.2', name: 'Llama 3.2', contextWindow: 8192},
        {id: 'gemma3', name: 'Gemma 3', contextWindow: 32768},
    ]
}

/**
 * 动态获取 QTCOOL 模型列表
 * @param {string} [apiKey] - 自定义密钥，不传则用默认密钥
 * @returns {Promise<Array<{id:string, name:string, contextWindow:number, reasoning?:boolean}>>}
 */
export async function fetchQtcoolModels(apiKey) {
    const key = apiKey || QTCOOL.defaultKey
    try {
        const resp = await fetch(QTCOOL.baseUrl + '/models', {
            headers: {'Authorization': 'Bearer ' + key},
            signal: AbortSignal.timeout(8000)
        })
        if (resp.ok) {
            const data = await resp.json()
            if (data.data && data.data.length) {
                return data.data.map(m => ({
                    id: m.id, name: m.id, contextWindow: 128000,
                    reasoning: m.id.includes('codex')
                })).sort((a, b) => b.id.localeCompare(a.id))
            }
        }
    } catch { /* use fallback */
    }
    return QTCOOL.models
}
