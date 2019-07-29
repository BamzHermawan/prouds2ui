# PRouDS 2 UI Template

Projects ini menggunakan [Parcel Bundler](https://parceljs.org). Dan berikut adalah JS Plugins yang digunakan:

* [VueJS](https://vuejs.org/)
* [Highchart.js](https://www.highcharts.com/)
* [AxiosJS](https://github.com/axios/axios)

## Getting started

> **⚠ Perhatian!**.
> Project ini menggunakan yarn. Jangan tercampur dengan NPM.

* Clone Repositori ini 👌.
* Buka terminal pada direktori project ini, kemudian jalankan perintah berikut ini: `yarn install`.
* Berikut adalah perintah yang dapat digunakan setelah meng-install dependensi:
    * `yarn ngoding`: Memulai parcel environtmen (Hot Reloading) untuk mulai ngoding 🔥 (outuput: dist folder).
    * `yarn mantap`: Build Project ke HTML untuk siap di gabungkan ke CodeIgniter 😎 (output: release folder).
	* `yarn demo`: Command ini akan menjalankan `yarn mantap` kemudian menjalankan **PHP SERVER** pada release folder.
    * `yarn bersih`: Hapus dist folder untuk Project build yang **Bersih** dan **Sempurna** 🤣.

> **⚠ Note:**
> `yarn ngoding` Perintah ini hanya untuk Development saja. **JANGAN** gunakan pada server production!.
> `yarn demo` Menggunakan PHP untuk menjalankan `localhost:5501`. Pastikan kamu sudah menginstall PHP ^5.6.

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
|	├─ 📁 pages
|	├─ 📁 styles
|	└─ 📂 scripts
|   	└─ 📂 vue
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

Last Edit: 29 Juli 2019.
Oleh: [Ario Widiatmoko](https://github.com/ariomoklo)
