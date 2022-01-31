# jis-reader-ts
jisバーコードを読み込むテスト

## 目的

* バーコード(jis)をブラウザから読み込みたい

## やったこと

* yarn v3環境
* Gatsby v5 + mui v5 でプロジェクトを初期化
* TypeScript環境を多少いい感じに
* VSCodeの補完やLintの設定
* バーコードリーダーのサンプルをいくつか試用
* Chromeネイティブで動作するBarcodeDetectorを発見、これを実装する
* https://umahaumai.github.io/jis-reader-ts/ で公開

## 試したことと結果や考察

* Webで公開されている各種バーコードリーダーの調査。
  * QRコードの実装はそこそこメンテされているものの、ブラウザで動作するjisコードパーサーに関しては最新のものでも2年前、有名所は5年前で更新が止まっている。
  * ライブラリの更新状況が上記のため、2020年の記事の [ここ](https://blog.ecbeing.tech/entry/2020/06/30/114023) の状況からほぼ変化なし。
  * iOS / Android向けならある。
* WebCodeCamJS / JOB / QuaggerJS それぞれのサンプルを動作確認。
  * 大きめのJANコードが記載されたとんがりコーンの箱を用いてテスト。
    * PCでは全て識別できず。
      * そもそもビデオのプレビューがボケてピントが合わない。
    * スマホではすべて識別可。
  * スマホで撮影した画像は、PCでもすべて識別可。
  * A4サイズに拡大印刷したJANコードはすべて識別可。
  * 以上から、ライブラリとしてはある程度完成しており、PCのWebカメラ側の性能による問題が大きのではないかと思われる。
  * マクロ撮影用レンズを用いて接写するとか、オートフォーカスのカメラを使用するなど、主に物理面の対策が不可欠ではないか。
 * BarcodeDetectorでバーコードリーダーを実装、テスト。
   * PCのWebカメラではとんがりコーンの識別はやはり不可。
   * A4サイズは識別可。
   * スマホでもとんがりコーンをカメラの前を暫く操作してようやく識別に成功した。
   * カメラの制御が不可欠。

## https://umahaumai.github.io/jis-reader-ts/ について

* Chromeにのみ対応している BarcodeDetector を使ったサンプルです。
* カメラを起動します。
* 1秒おきにスキャンして、画面内にバーコードがあればリストに追加します。
* 1画面に複数バーコードも対応するみたいです。（未評価）
