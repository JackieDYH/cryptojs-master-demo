cryptojs
by JackieDYH
获取微信用户的身份标识
---


### install

```
npm install cryptojs
```

### usage (example with [coffee-script](http://coffeescript.org/))

```coffee
Crypto = (require 'cryptojs').Crypto
key = '12345678'
us = 'Hello, 中国!'

mode = new Crypto.mode.ECB Crypto.pad.pkcs7

ub = Crypto.charenc.UTF8.stringToBytes us
eb = Crypto.DES.encrypt ub, key, {asBytes: true, mode: mode}
ehs= Crypto.util.bytesToHex eb

eb2= Crypto.util.hexToBytes ehs
ub2= Crypto.DES.decrypt eb2, key, {asBytes: true, mode: mode}
us2= Crypto.charenc.UTF8.bytesToString ub2
# should be same as the var 'us'
console .log us2
```
