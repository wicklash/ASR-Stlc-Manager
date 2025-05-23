import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Model açıklamaları örnek
function useModelInfo(selectedModel) {
    const modelDescriptions = {
        "codegeex4: 9B": [
          "A multilingual code generation model with 9B parameters.",
          "Supports tasks like code completion, commenting, and function calls.",
          "Trained on GLM-4-9B and can handle 128K token context."
        ],
        "codellama: 7B": [
          "A code generation model based on Meta's Llama 2 architecture.",
          "Supports various languages like Python, C++, Java, PHP, TypeScript, C#, and Bash.",
          "Capable of code completion, debugging, and natural language descriptions."
        ],
        "deepseek-coder: 6.7B": [
          "A 6.7B parameter model optimized for code generation and interpretation.",
          "Provides high-accuracy code generation in various programming languages.",
          "Efficient at code completion and bug-fixing tasks."
        ],
        "gemma2: 2B": [
          "A lightweight 2B parameter model for code generation.",
          "Ideal for small projects and low-resource environments.",
          "Supports basic code completion and suggestions."
        ],
        "gemma3: 4B": [
          "A 4B parameter model optimized for mid-sized projects.",
          "Can handle more complex code structures.",
          "Balanced performance in code generation and interpretation."
        ],
        "llama3.2: 3B": [
          "A 3B parameter model optimized for fast and efficient code generation.",
          "Effective for small and medium-sized code completion tasks.",
          "Provides low-latency responses."
        ],
        "qwen2.5: 7B": [
          "A multilingual 7B parameter model for code generation.",
          "Generates high-accuracy code in multiple programming languages.",
          "Efficient at code completion and interpretation."
        ],
        "qwen2.5-coder: 3B": [
          "A lightweight 3B parameter model for code generation.",
          "Ideal for small projects and low-resource environments.",
          "Supports basic code completion and suggestions."
        ],
        "stable-code: 3B": [
          "A 3B parameter model known for its stable and reliable code generation.",
          "Effective at code completion and bug fixing.",
          "Supports a variety of programming languages."
        ],
        "starcoder2: 7B": [
          "A 7B parameter model with advanced code generation and analysis capabilities.",
          "Handles complex code structures and projects well.",
          "Excels in code completion and suggestion tasks."
        ]
      };
  return modelDescriptions[selectedModel] || [];
}

export default function EnvironmentSetupForm({ process, onAIModelUpdate, onOutputFormatUpdate, aiModels, disabled }) {
  const [model, setModel] = useState(aiModels?.[process?.id] || 'llama3.2: 1B');
  const [modelInfo, setModelInfo] = useState([]);
  const [outputFormat, setOutputFormat] = useState('JSON');

  const models = [
    "codegeex4:9b",
    "codellama:7b",
    "deepseek-coder:6.7b",
    "gemma2:2b",
    "gemma3:4b",
    "llama3.2:3b",
    "qwen2.5:7b",
    "qwen2.5-coder:3b",
    "stable-code:3b",
    "starcoder2:7b"
    // Diğer modeller eklenebilir
  ];

  useEffect(() => {
    if (process && onAIModelUpdate && !aiModels?.[process?.id]) {
      onAIModelUpdate(process.id, model);
    }
    
    // Set initial output format
    if (process && onOutputFormatUpdate) {
      onOutputFormatUpdate(process.id, outputFormat);
    }
  }, []);

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setModel(selectedModel);
    setModelInfo(useModelInfo(selectedModel));
    if (process && onAIModelUpdate) {
      onAIModelUpdate(process.id, selectedModel);
    }
  };

  const handleOutputFormatChange = (e) => {
    const selectedFormat = e.target.value;
    setOutputFormat(selectedFormat);
    console.log(`[EnvironmentSetupForm] Output format changed to: ${selectedFormat}`);
    
    if (process && onOutputFormatUpdate) {
      onOutputFormatUpdate(process.id, selectedFormat);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Process Configuration</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">AI Model</label>
            <select
              value={model}
              onChange={handleModelChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={disabled}
            >
              <option value="">Default model: llama3.2: 1B</option>
              {models.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="mt-2 text-sm text-blue-600 font-semibold">
            Seçili model: {model || 'llama3.2: 1B'}
          </div>
          {modelInfo.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <h4 className="font-medium">Model Bilgisi:</h4>
              <ul className="list-disc pl-5">
                {modelInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Output Format</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Format</label>
            <select
              value={outputFormat}
              onChange={handleOutputFormatChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={disabled}
            >
              <option value="JSON">JSON</option>
              <option value="XML">XML</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

EnvironmentSetupForm.propTypes = {
  process: PropTypes.object.isRequired,
  onAIModelUpdate: PropTypes.func,
  onOutputFormatUpdate: PropTypes.func,
  aiModels: PropTypes.object,
  disabled: PropTypes.bool
}; 