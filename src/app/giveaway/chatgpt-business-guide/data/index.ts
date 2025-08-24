// すべてのプロンプトデータをまとめるインデックスファイル
import { Prompt } from './types';
import { document_writingPrompts } from './document-writing-prompts';
import { data_excelPrompts } from './data-excel-prompts';
import { communicationPrompts } from './communication-prompts';
import { planning_strategyPrompts } from './planning-strategy-prompts';
import { learning_skillsPrompts } from './learning-skills-prompts';

export const promptData: Prompt[] = [
  ...document_writingPrompts,
  ...data_excelPrompts,
  ...communicationPrompts,
  ...planning_strategyPrompts,
  ...learning_skillsPrompts
];

export * from './types';
