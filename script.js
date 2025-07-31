class Calculator {
    constructor() {
        // 現在と過去の入力、演算子の初期化
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
        this.shouldResetScreen = false; // 計算後に画面をリセットするかどうかのフラグ

        // 表示要素を取得
        this.previousOperandElement = document.getElementById('previous-operand');
        this.currentOperandElement = document.getElementById('current-operand');

        // イベントリスナーの設定
        this.setupEventListeners();
    }

    setupEventListeners() {
        // 数字ボタンのクリックイベントを設定
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.number);
            });
        });

        // 各機能ボタン（演算子、クリア、削除など）のクリックイベントを設定
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;

                switch(action) {
                    case 'add':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                        this.chooseOperation(action); // 四則演算
                        break;
                    case 'equals':
                        this.compute(); // 計算実行
                        break;
                    case 'clear':
                        this.clear(); // 全リセット
                        break;
                    case 'delete':
                        this.delete(); // 1文字削除
                        break;
                    case 'percent':
                        this.percent(); // パーセント変換
                        break;
                }
            });
        });

        // キーボード操作にも対応
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    appendNumber(number) {
        // 計算後の入力はリセットしてから新しい数字を入れる
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }

        // 小数点が複数にならないように
        if (number === '.' && this.currentOperand.includes('.')) return;

        // 最初の「0」を置き換える（ただし小数点は除く）
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }

        this.updateDisplay();
    }

    chooseOperation(operation) {
        // 数字が入力されていない場合はスキップ
        if (this.currentOperand === '') return;

        // すでに前の数値がある場合は先に計算を実行
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        // 数値に変換
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let computation;

        // 数値でない場合は何もしない
        if (isNaN(prev) || isNaN(current)) return;

        // 四則演算の実行
        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    alert('0で割ることはできません！');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        // 結果を反映し、状態を初期化
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    clear() {
        // 全ての状態を初期化
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        this.updateDisplay();
    }

    delete() {
        // 1文字だけ削除。1文字しかない場合は0に戻す
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
        this.updateDisplay();
    }

    percent() {
        // パーセント表現に変換
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;

        this.currentOperand = (current / 100).toString();
        this.updateDisplay();
    }

    getDisplayNumber(number) {
        // 表示用に3桁カンマ区切りなど整形
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('ja-JP', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        // 現在の入力数値を画面に表示
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);

        // 前の数値と演算子も表示（操作中のみ）
        if (this.operation != null) {
            const operationSymbols = {
                'add': '+',
                'subtract': '−',
                'multiply': '×',
                'divide': '÷'
            };

            this.previousOperandElement.textContent =
                `${this.getDisplayNumber(this.previousOperand)} ${operationSymbols[this.operation]}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    handleKeyboard(e) {
        const key = e.key;

        // 数字・小数点の入力
        if (key >= '0' && key <= '9' || key === '.') {
            this.appendNumber(key);
        }
        // 四則演算の入力
        else if (key === '+' || key === '-') {
            this.chooseOperation(key === '+' ? 'add' : 'subtract');
        }
        else if (key === '*') {
            this.chooseOperation('multiply');
        }
        else if (key === '/') {
            e.preventDefault(); // ブラウザの検索などを防止
            this.chooseOperation('divide');
        }
        // イコールまたはEnterキーで計算
        else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            this.compute();
        }
        // バックスペースで1文字削除
        else if (key === 'Backspace') {
            this.delete();
        }
        // エスケープでリセット
        else if (key === 'Escape') {
            this.clear();
        }
        // パーセントキー
        else if (key === '%') {
            this.percent();
        }
    }
}

// ページ読み込み完了後に電卓を初期化
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});