## Notified Helper

Helper untuk memanggil notification / toast / Snackbar.

### How to Use

``` javascript

import { notified } from 'helper-tools'

// menampilkan notification
notified(this.$notification).primary('Hello World');

// menampilkan toast
notified(this.$toast).success('Hello World');

// menampilkan snackbar
notified(this.$snackbar).danger('Hello World');

```