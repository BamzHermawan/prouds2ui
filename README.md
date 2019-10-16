# PRouDS 2 UI Template

Projects ini menggunakan [Parcel Bundler](https://parceljs.org) dan menggunakan framework [VueJS](https://vuejs.org/)

## Getting started

> **⚠ Perhatian!**.
> Project ini menggunakan yarn. Jangan tercampur dengan NPM.

* Clone Repositori ini 👌.
* Buka terminal pada direktori project ini, kemudian jalankan perintah berikut ini: `yarn install`.
* Berikut adalah perintah yang dapat digunakan setelah meng-install dependensi:
    * `yarn ngoding`: Memulai parcel environtmen (Hot Reloading) untuk mulai ngoding 🔥 (outuput: dist folder).
		* `yarn ngoding:pro`: Menjalankan ngoding pada folder production.
		* `yarn ngoding:pick <entry-file>`: Menjalankan ngoding pada custom entry point, contoh `<entry-file>`: **src/production/pages/blank.html**.
    * `yarn mantap`: Build Project ke HTML untuk siap di gabungkan ke CodeIgniter 😎 (output: release folder).
	* `yarn demo`: Command ini akan menjalankan `yarn mantap` kemudian menjalankan **PHP SERVER** pada release folder.
    * `yarn bersih`: Hapus dist folder untuk Project build yang **Bersih** dan **Sempurna** 🤣.

> **⚠ Note:**
> `yarn ngoding` Perintah ini hanya untuk Development saja. **JANGAN** gunakan pada server production!.
> `yarn demo` Menggunakan PHP untuk menjalankan `localhost:5501`. Pastikan kamu sudah menginstall PHP ^5.6.

## STANDART COMMENTS CODE

Untuk yang berpartisipasi dalam project ini, kami telah menetapkan beberapa kata kunci pada code comments agar memudahkan pemahaman kode satu sama lain. berikut adalah daftar code comments yang mesti anda pahami dan terapkan. [jika anda menggunakan vscode, pasang ekstention [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) ]

`//! HAPUS` digunakan sebagai penanda bagian kode yang harus di hapus sebelum ke production, contoh penggunaan:

``` javascript
function sum(a, b) {
	let result = a + b;

	//! HAPUS START
	console.log(result)
	//! HAPUS END

	return result;
}

```

`//TODO: <ditujukan kepada>` digunakan sebagai penanda pemberitahuan apa yang harus dilakukan, contoh penggunaan:

``` javascript
function sum(a, b) {
	/**
	 * TODO: Ade
	 * buat algoritma penambahan a dan b, return hasilnya sebagai result ya 😎.
	*/

	return result;
}

```

## Project Hierarchy

```
📦 prouds2ui
├─ 📁 dist [Development Server Root]
├─ 📂 release [Build Output Directory]
|	├─ 📁 demo [PHP Script for demo only]
|	├─ 📁 login [Login Page Directory]
| 	├─ 📁 media [Images Directory]
|	├─ 📁 pages [HTML Page Directory]
|	├─ 📁 src [JS and CSS Directory]
| 	└─ 📄 index.php [Demo Login PHP Script]
├─ 📂 src [Working Directory]
|	├─ 📁 components
|	├─ 📁 development
|	├─ 📂 helper
|	├─ 📂 production
|	└─ 📂 styles
├─ 📄 .CONTRIBUTING.md
├─ 📄 .gitignore
├─ 📄 .vscode
├─ 📄 package.json
├─ 📄 README.md
├─ 📄 yarn-error.log
└─ 📄 yarn.lock
```

> **⚠ Note:**
> `dist` folder may not exist in the fisrt time you clone this repository.

Last Edit: 11 Oktober 2019.
Oleh: [Ario Widiatmoko](https://github.com/ariomoklo)
