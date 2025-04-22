# ファイルを作成
cat > setup_manga_ai_project.sh << 'EOF'
#!/bin/bash

# 漫画生成AIプロジェクトのディレクトリ構造を作成するスクリプト
echo "漫画生成AIプロジェクトのセットアップを開始します..."

# プロジェクトのルートディレクトリを作成
mkdir -p manga-ai-project
cd manga-ai-project

# ルートレベルのファイルを作成
touch .gitignore README.md LICENSE package.json

# GitHub Actionsのディレクトリを作成
mkdir -p .github/workflows
touch .github/workflows/frontend-ci-cd.yml
touch .github/workflows/backend-ci-cd.yml
touch .github/workflows/ai-model-ci-cd.yml

# フロントエンドのディレクトリ構造を作成
echo "フロントエンドのディレクトリと空ファイルを作成中..."
mkdir -p frontend/public
mkdir -p frontend/src/app/api
mkdir -p frontend/src/app/\(auth\)/login
mkdir -p frontend/src/app/\(auth\)/signup
mkdir -p frontend/src/app/dashboard
mkdir -p frontend/src/app/upload
mkdir -p frontend/src/app/script
mkdir -p frontend/src/app/result/\[id\]
mkdir -p frontend/src/app/feedback/\[id\]
mkdir -p frontend/src/app/gallery
mkdir -p frontend/src/app/settings

# コンポーネントのディレクトリを作成
mkdir -p frontend/src/components/common
mkdir -p frontend/src/components/forms
mkdir -p frontend/src/components/layout
mkdir -p frontend/src/components/upload
mkdir -p frontend/src/components/script
mkdir -p frontend/src/components/manga
mkdir -p frontend/src/components/feedback

# その他のディレクトリを作成
mkdir -p frontend/src/hooks
mkdir -p frontend/src/services
mkdir -p frontend/src/stores
mkdir -p frontend/src/utils
mkdir -p frontend/src/types
mkdir -p frontend/src/styles

# フロントエンドの設定ファイル
touch frontend/tailwind.config.js
touch frontend/tsconfig.json
touch frontend/jest.config.js
touch frontend/package.json
touch frontend/.env.development
touch frontend/.env.test
touch frontend/Dockerfile

# アプリのメインファイル
touch frontend/src/app/layout.tsx
touch frontend/src/app/page.tsx
touch frontend/src/app/api/route.ts

# 共通コンポーネント
touch frontend/src/components/common/Button.tsx
touch frontend/src/components/common/Card.tsx
touch frontend/src/components/common/Modal.tsx
touch frontend/src/components/common/Spinner.tsx
touch frontend/src/components/common/Tooltip.tsx

# フォームコンポーネント
touch frontend/src/components/forms/FormField.tsx
touch frontend/src/components/forms/Dropdown.tsx
touch frontend/src/components/forms/RadioGroup.tsx
touch frontend/src/components/forms/Slider.tsx

# レイアウトコンポーネント
touch frontend/src/components/layout/Header.tsx
touch frontend/src/components/layout/Footer.tsx
touch frontend/src/components/layout/Sidebar.tsx
touch frontend/src/components/layout/PageContainer.tsx

# アップロード関連コンポーネント
touch frontend/src/components/upload/UploadForm.tsx
touch frontend/src/components/upload/ImagePreview.tsx
touch frontend/src/components/upload/UploadProgress.tsx
touch frontend/src/components/upload/TagEditor.tsx

# 脚本入力関連コンポーネント
touch frontend/src/components/script/ScriptInput.tsx
touch frontend/src/components/script/SceneEditor.tsx
touch frontend/src/components/script/CharacterList.tsx
touch frontend/src/components/script/StyleSelector.tsx

# 漫画表示関連コンポーネント
touch frontend/src/components/manga/MangaPreview.tsx
touch frontend/src/components/manga/PageView.tsx
touch frontend/src/components/manga/PanelView.tsx
touch frontend/src/components/manga/NavigationControls.tsx

# フィードバック関連コンポーネント
touch frontend/src/components/feedback/FeedbackForm.tsx
touch frontend/src/components/feedback/RatingScale.tsx
touch frontend/src/components/feedback/ComparisonView.tsx
touch frontend/src/components/feedback/AnnotationTool.tsx

# カスタムフック
touch frontend/src/hooks/useUpload.ts
touch frontend/src/hooks/useScript.ts
touch frontend/src/hooks/useMangaGeneration.ts
touch frontend/src/hooks/useFeedback.ts
touch frontend/src/hooks/useModels.ts

# APIサービス
touch frontend/src/services/api.ts
touch frontend/src/services/upload.service.ts
touch frontend/src/services/script.service.ts
touch frontend/src/services/manga.service.ts
touch frontend/src/services/feedback.service.ts
touch frontend/src/services/models.service.ts

# 状態管理
touch frontend/src/stores/user.store.ts
touch frontend/src/stores/upload.store.ts
touch frontend/src/stores/models.store.ts
touch frontend/src/stores/script.store.ts
touch frontend/src/stores/generation.store.ts

# ユーティリティ
touch frontend/src/utils/validation.ts
touch frontend/src/utils/formatting.ts
touch frontend/src/utils/s3Upload.ts
touch frontend/src/utils/imageProcessing.ts

# TypeScript型定義
touch frontend/src/types/index.ts
touch frontend/src/types/models.ts
touch frontend/src/types/api.ts
touch frontend/src/types/manga.ts

# スタイル
touch frontend/src/styles/globals.css
touch frontend/src/styles/components.css

# バックエンドのディレクトリ構造
echo "バックエンドのディレクトリと空ファイルを作成中..."
mkdir -p backend/app/api
mkdir -p backend/app/models
mkdir -p backend/app/services
mkdir -p backend/app/utils
mkdir -p backend/tests

# APIエンドポイント
touch backend/app/api/__init__.py
touch backend/app/api/manga.py
touch backend/app/api/train.py
touch backend/app/api/feedback.py
touch backend/app/api/models.py

# データモデル
touch backend/app/models/__init__.py
touch backend/app/models/base.py
touch backend/app/models/schema.py
touch backend/app/models/database.py

# ビジネスロジック
touch backend/app/services/__init__.py
touch backend/app/services/ai_service.py
touch backend/app/services/database_service.py
touch backend/app/services/storage_service.py
touch backend/app/services/auth_service.py

# ユーティリティ
touch backend/app/utils/__init__.py
touch backend/app/utils/exceptions.py
touch backend/app/utils/auth.py
touch backend/app/utils/logger.py

# メインアプリファイル
touch backend/app/config.py
touch backend/app/dependencies.py
touch backend/app/main.py

# テスト
touch backend/tests/__init__.py
touch backend/tests/conftest.py
touch backend/tests/test_manga_api.py
touch backend/tests/test_train_api.py
touch backend/tests/test_feedback_api.py

# 設定ファイル
touch backend/requirements.txt
touch backend/.env.example
touch backend/Dockerfile

# AIモデルのディレクトリ構造
echo "AIモデルのディレクトリと空ファイルを作成中..."
mkdir -p ai-models/base-model/stable-diffusion-xl-base-1.0
mkdir -p ai-models/lora-models/metadata
touch ai-models/lora-models/character_set_A.safetensors
touch ai-models/lora-models/background_set_B.safetensors
touch ai-models/lora-models/expression_set_C.safetensors
touch ai-models/lora-models/metadata/model_registry.json

# ControlNetモデル
mkdir -p ai-models/controlnet/control_v11p_sd15_openpose
mkdir -p ai-models/controlnet/control_v11p_sd15_canny
mkdir -p ai-models/controlnet/control_v11f_sd15_depth

# GPT連携
mkdir -p ai-models/gpt-integrations/prompt_templates
touch ai-models/gpt-integrations/prompt_templates/scene_analysis.txt
touch ai-models/gpt-integrations/prompt_templates/panel_layout.txt
touch ai-models/gpt-integrations/scenario_parser.py
touch ai-models/gpt-integrations/direction_generator.py

# ソースコード
mkdir -p ai-models/src/utils
mkdir -p ai-models/src/api
mkdir -p ai-models/src/config

# ユーティリティ
touch ai-models/src/utils/__init__.py
touch ai-models/src/utils/lora_trainer.py
touch ai-models/src/utils/version_manager.py
touch ai-models/src/utils/inference_pipeline.py

# API
touch ai-models/src/api/__init__.py
touch ai-models/src/api/train_api.py
touch ai-models/src/api/generate_api.py

# 設定
touch ai-models/src/config/__init__.py
touch ai-models/src/config/training_config.json
touch ai-models/src/config/inference_config.json
touch ai-models/src/main.py

# テスト
mkdir -p ai-models/tests
touch ai-models/tests/__init__.py
touch ai-models/tests/test_lora_training.py
touch ai-models/tests/test_manga_generation.py

# 設定ファイル
touch ai-models/requirements.txt
touch ai-models/Dockerfile

# インフラのディレクトリ構造
echo "インフラ関連のディレクトリと空ファイルを作成中..."
mkdir -p infrastructure/terraform
mkdir -p infrastructure/scripts
mkdir -p infrastructure/monitoring/cloudwatch-dashboards
mkdir -p infrastructure/monitoring/alerts
mkdir -p infrastructure/docker

# Terraformファイル
touch infrastructure/terraform/main.tf
touch infrastructure/terraform/variables.tf
touch infrastructure/terraform/outputs.tf
touch infrastructure/terraform/vpc.tf
touch infrastructure/terraform/ecs.tf
touch infrastructure/terraform/s3.tf
touch infrastructure/terraform/dynamodb.tf
touch infrastructure/terraform/lambda.tf

# スクリプト
touch infrastructure/scripts/setup-local-env.sh
touch infrastructure/scripts/deploy.sh
touch infrastructure/scripts/backup.sh

# Dockerファイル
touch infrastructure/docker/docker-compose.yml
touch infrastructure/docker/docker-compose.test.yml
touch infrastructure/docker/docker-compose.localstack.yml

# ローカルストレージディレクトリ
echo "ローカル開発用ストレージディレクトリを作成中..."
mkdir -p storage/uploads
mkdir -p storage/generated

# テストディレクトリ
echo "テストディレクトリと空ファイルを作成中..."
mkdir -p tests/e2e
mkdir -p tests/performance

# E2Eテスト
touch tests/e2e/setup.js
touch tests/e2e/upload.spec.js
touch tests/e2e/script.spec.js
touch tests/e2e/generation.spec.js

# パフォーマンステスト
touch tests/performance/load_test.js
touch tests/performance/stress_test.js

# ドキュメントディレクトリ
echo "ドキュメントディレクトリと空ファイルを作成中..."
mkdir -p docs/api
mkdir -p docs/architecture
mkdir -p docs/development
mkdir -p docs/user

# APIドキュメント
touch docs/api/openapi.yaml
touch docs/api/postman_collection.json

# アーキテクチャ図
touch docs/architecture/system_overview.png
touch docs/architecture/data_flow.png

# 開発者ドキュメント
touch docs/development/setup.md
touch docs/development/frontend.md
touch docs/development/backend.md
touch docs/development/ai_models.md
touch docs/development/testing.md

# ユーザードキュメント
touch docs/user/getting_started.md
touch docs/user/advanced_features.md

echo "漫画生成AIプロジェクトのディレクトリ構造の作成が完了しました！"
EOF

# 実行権限を付与
chmod +x setup_manga_ai_project.sh

# スクリプトの実行
./setup_manga_ai_project.sh