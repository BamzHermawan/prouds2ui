# PRouDS 2 UI Template

Projects ini menggunakan [Parcel Bundler](https://parceljs.org). Dan berikut adalah JS Plugins yang digunakan:

* [Highchart.js](https://www.highcharts.com/)
* [VueJS](https://vuejs.org/)
* [AxiosJS](https://github.com/axios/axios)

## Getting started

> **⚠ Perhatian!**.
> Project ini menggunakan yarn. Jangan tercampur dengan NPM.

* Clone Repositori ini 👌.
* Buka terminal pada direktori project ini, kemudian jalankan perintah berikut ini: `yarn install`.
* Berikut adalah perintah yang dapat digunakan setelah meng-install dependensi:
    * `yarn ngoding`: Memulai parcel environtmen (Hot Reloading) untuk mulai ngoding 🔥 (outuput: dist folder).
    * `yarn mantap`: Build Project ke HTML untuk siap di gabungkan ke CodeIgniter 😎 (output: release folder).
    * `yarn bersih`: Hapus dist folder untuk Project build yang **Bersih** dan **Sempurna** 🤣.

> **⚠ Note:**
> `yarn ngoding` Perintah ini hanya untuk Development saja. **JANGAN** gunakan pada server production!.

## Project Hierarchy

```
.
+-- .vscode (Visual Studio Configuration)
+-- dist (Development Server Root) *May not exist in first cloning
+-- release (Build Output Directory)
|   +-- login (Login Page Directory)
|   +-- pages (HTML Page Directory)
|   +-- src (JS and CSS Directory)
|   +-- media (Images Directory)
+-- src (Working Directory)
|   +-- login
|   +-- pages
|   +-- scripts
|   |	+-- vue
|   |	|	+-- components
|   |	|	+-- pages
|   +-- styles
+-- .gitignore
+-- .CONTRIBUTING.md
+-- package.json
+-- README.md
+-- yarn-error.log
+-- yarn.lock
```

Last Edit: 16 Juli 2019.
Oleh: [Ario Widiatmoko](https://github.com/ariomoklo)
