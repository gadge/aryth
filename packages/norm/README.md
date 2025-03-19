# @aryth/norm

[![npm version][badge-npm-version]][url-npm]
[![npm download monthly][badge-npm-download-monthly]][url-npm]
[![npm download total][badge-npm-download-total]][url-npm]
[![npm dependents][badge-npm-dependents]][url-github]
[![npm license][badge-npm-license]][url-npm]
[![pp install size][badge-pp-install-size]][url-pp]
[![github commit last][badge-github-last-commit]][url-github]
[![github commit total][badge-github-commit-petals]][url-github]

[//]: <> (Shields)

[badge-npm-version]: https://flat.badgen.net/npm/v/@aryth/norm

[badge-npm-download-monthly]: https://flat.badgen.net/npm/dm/@aryth/norm

[badge-npm-download-total]:https://flat.badgen.net/npm/dt/@aryth/norm

[badge-npm-dependents]: https://flat.badgen.net/npm/dependents/@aryth/norm

[badge-npm-license]: https://flat.badgen.net/npm/license/@aryth/norm

[badge-pp-install-size]: https://flat.badgen.net/packagephobia/install/@aryth/norm

[badge-github-last-commit]: https://flat.badgen.net/github/last-commit/hoyeungw/aryth

[badge-github-commit-petals]: https://flat.badgen.net/github/commits/hoyeungw/aryth

[//]: <> (Link)

[url-npm]: https://npmjs.org/package/@aryth/norm

[url-pp]: https://packagephobia.now.sh/result?p=@aryth/norm

[url-github]: https://github.com/hoyeungw/aryth

##### Math util library

#### Features

#### Install

```console
$ npm install @aryth/norm
```

#### Usage

```js
```

#### Norm Definition

R0 = 3.442619855899: This is the start of the tail region of the normal distribution. It's the x-coordinate beyond which
the algorithm handles the "tail" of the distribution specially. This value is chosen so that the tail can be efficiently
sampled.

R1 = 1.0 / R0: This is simply the reciprocal of R0, used in the tail sampling portion of the algorithm.

R0S = exp(-0.5 * R0 * R0): This represents the height of the normal probability density function at the point R0. It's
the y-coordinate of the normal curve at the tail cutoff point.

VN = 9.91256303526217e-3: This constant represents the volume of the base rectangle in the norm structure. It's a
carefully chosen value that makes the algorithm efficient.

M1 = 2147483648.0: This is 2^31, the maximum value that can be represented in a 32-bit signed integer. It's used as a
scaling factor to convert between floating-point and integer representations.

N2P32 = -0x100000000: This is -2^32, used in the uniform normom number generator (norm() method). It helps scale the
output of the xorshift() function to produce numbers in the [0,1] range.

#### Meta

[LICENSE (MIT)](LICENSE)
