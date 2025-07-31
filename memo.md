# プログラミング学習メモ - 電卓アプリ作成

## 📅 作成日: 2025年7月27日
## 🎯 プロジェクト: 電卓アプリ
## 📍 場所: 100日チャレンジ/day1_250727/calculator/

---

## 🧮 作成したもの

**Webアプリケーション（電卓）**
- ブラウザで動くプログラム
- モダンで美しいデザイン
- 完全な計算機能

---

## 📁 ファイル構成の基礎

Webアプリは3つのファイルで構成される：

```
calculator/
├── index.html    # 構造（骨組み）
├── style.css     # デザイン（見た目）
└── script.js     # 機能（動き）
```

### 各ファイルの役割

| ファイル | 役割 | 言語 | 説明 |
|---------|------|------|------|
| index.html | 構造 | HTML | ページの骨組みを作る |
| style.css | デザイン | CSS | 見た目を美しくする |
| script.js | 機能 | JavaScript | 動きを制御する |

---

## 📝 HTML（index.html）の基礎

### HTMLとは
- **構造**を定義する言語
- Webページの骨組みを作る
- タグ（<>）を使って要素を定義

### 基本構造
```html
<!DOCTYPE html>          <!-- HTMLファイルであることを宣言 -->
<html lang="ja">         <!-- 日本語のページであることを宣言 -->
<head>                   <!-- ページの設定情報 -->
    <title>電卓アプリ</title>  <!-- ブラウザのタブに表示されるタイトル -->
    <link rel="stylesheet" href="style.css">  <!-- CSSファイルを読み込み -->
</head>
<body>                   <!-- 実際に表示される内容 -->
    <!-- ここに電卓の内容が入る -->
    <script src="script.js"></script>  <!-- JavaScriptファイルを読み込み -->
</body>
</html>
```

### 重要なHTML要素
- `<div>`: 箱を作る要素
- `<button>`: ボタンを作る要素
- `class`: 要素に名前を付ける属性
- `data-`: データを保存する属性

### 電卓の構造例
```html
<div class="calculator">     <!-- 電卓全体の箱 -->
    <div class="display">    <!-- 計算結果を表示する画面 -->
        <div class="previous-operand">前の計算</div>
        <div class="current-operand">現在の数字</div>
    </div>
    <div class="buttons">    <!-- ボタン群 -->
        <button class="btn number" data-number="1">1</button>
        <button class="btn operator" data-action="add">+</button>
    </div>
</div>
```

---

## 🎨 CSS（style.css）の基礎

### CSSとは
- **デザイン**を定義する言語
- 見た目を美しくする
- セレクタとプロパティで構成

### 基本構造
```css
/* セレクタ { プロパティ: 値; } */
.calculator {
    background: rgba(255, 255, 255, 0.1);  /* 背景色 */
    border-radius: 20px;                    /* 角を丸く */
    padding: 20px;                          /* 内側の余白 */
}
```

### 重要なCSS概念

#### 1. セレクタ（何を装飾するか）
```css
.calculator    /* class="calculator"の要素 */
.btn          /* class="btn"の要素 */
.btn:hover    /* マウスが上に来た時の.btn */
```

#### 2. レイアウト（配置）
```css
display: flex;           /* 横並びに配置 */
justify-content: center; /* 中央寄せ */
grid-template-columns: repeat(4, 1fr); /* 4列のグリッド */
```

#### 3. アニメーション
```css
transition: all 0.3s ease;  /* 0.3秒かけて変化 */
transform: translateY(-2px); /* 上に2px移動 */
```

---

## ⚙️ JavaScript（script.js）の基礎

### JavaScriptとは
- **機能**を定義する言語
- ボタンを押した時の動作を制御
- 動的な処理を実現

### 基本構造

#### 1. クラス（設計図）
```javascript
class Calculator {
    constructor() {
        // 初期設定
        this.currentOperand = '0';  // 現在の数字
        this.operation = undefined; // 演算子
    }
    
    // メソッド（機能）
    appendNumber(number) {
        // 数字を追加する処理
    }
}
```

#### 2. イベントリスナー（ボタンが押された時の処理）
```javascript
// ボタンがクリックされた時の処理
button.addEventListener('click', () => {
    this.appendNumber(button.dataset.number);
});
```

#### 3. データ属性の活用
```html
<!-- HTMLでデータを設定 -->
<button data-number="1">1</button>
<button data-action="add">+</button>
```

```javascript
// JavaScriptでデータを取得
button.dataset.number  // "1"を取得
button.dataset.action  // "add"を取得
```

---

## 🔄 電卓の動作の流れ

### 1. 数字を入力する流れ
```
ユーザーが「1」をクリック
    ↓
HTML: <button data-number="1">1</button>
    ↓
JavaScript: appendNumber("1")が実行
    ↓
this.currentOperand = "1"
    ↓
updateDisplay()で画面を更新
    ↓
CSS: 美しい表示
```

### 2. 計算する流れ
```
ユーザーが「+」をクリック
    ↓
chooseOperation("add")が実行
    ↓
this.operation = "add"
    ↓
ユーザーが「2」をクリック
    ↓
ユーザーが「=」をクリック
    ↓
compute()が実行
    ↓
1 + 2 = 3を計算
    ↓
結果を表示
```

---

## 🧠 プログラミングの基本概念

### 1. 変数（データを保存する箱）
```javascript
let currentOperand = '0';  // 文字列を保存
let operation = undefined;  // 未定義を保存
```

### 2. 関数（処理をまとめたもの）
```javascript
function appendNumber(number) {
    // 数字を追加する処理
    this.currentOperand += number;
}
```

### 3. 条件分岐（if文）
```javascript
if (this.currentOperand === '0') {
    this.currentOperand = number;  // 0の場合は置き換え
} else {
    this.currentOperand += number; // 0以外は追加
}
```

### 4. ループ（繰り返し）
```javascript
// 全てのボタンに対して処理を実行
document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        // クリック時の処理
    });
});
```

---

## 📚 学習した技術

### HTML
- [x] 基本的なHTML構造
- [x] div要素の使い方
- [x] button要素の使い方
- [x] class属性の使い方
- [x] data属性の使い方

### CSS
- [x] セレクタの使い方
- [x] レイアウト（Flexbox、Grid）
- [x] アニメーション
- [x] レスポンシブデザイン
- [x] ガラスモーフィズム効果

### JavaScript
- [x] クラスの定義
- [x] イベントリスナー
- [x] 変数の使い方
- [x] 関数の定義
- [x] 条件分岐
- [x] ループ処理

---

## 🎯 次のステップ

### 短期目標
1. **HTMLの基礎**: タグの意味を理解する
2. **CSSの基礎**: レイアウトとデザインの仕組み
3. **JavaScriptの基礎**: 変数、関数、条件分岐

### 中期目標
1. **実践**: 小さな機能を追加してみる
2. **応用**: 他のWebアプリを作ってみる
3. **発展**: フレームワーク（React、Vue.js）を学ぶ

### 長期目標
1. **フルスタック開発**: バックエンドも学ぶ
2. **モバイルアプリ**: React Nativeなどを学ぶ
3. **AI・機械学習**: Pythonなどを学ぶ

---

## 💡 学習のコツ

1. **小さく始める**: 完璧を求めず、まず動くものを作る
2. **実践重視**: 本を読むだけでなく、実際にコードを書く
3. **エラーを恐れない**: エラーは学習の一部
4. **継続が大切**: 毎日少しずつでも学習する
5. **コミュニティ**: 他の学習者と交流する

---

## 📝 今日学んだこと

- [x] Webアプリの基本構成（HTML、CSS、JavaScript）
- [x] 電卓アプリの作成
- [x] モダンなデザインの実装
- [x] インタラクティブな機能の実装
- [x] レスポンシブデザインの理解

---

## 🚀 次回の目標

1. 電卓アプリに新しい機能を追加する
2. 別のWebアプリを作成する
3. より複雑なJavaScriptの概念を学ぶ

---

*このメモは学習の記録として作成されました。定期的に見直して、学習の進捗を確認してください。* 
