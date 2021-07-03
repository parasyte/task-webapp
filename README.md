# Task-webapp

[Live demo](https://parasyte.github.io/task-webapp)

Many UI frameworks use a task list application example to illustrate how the framework is used. The idea is popular enough that there are entire projects dedicated to writing the same task list with multiple frameworks to better compare various UI frameworks.

This is the same kind of task list application, but it does not use any UI framework beyond what is provided by vanilla JavaScript, HTML, and CSS. It works on every major browser released since 2020. The primary source code is under 5 KiB total (gzipped) with no dependencies and build system necessary.

This is mostly an example of the [KISS](https://en.wikipedia.org/wiki/KISS_principle) and [YAGNI](https://www.martinfowler.com/bliki/Yagni.html) principles at work. Build only what you need, and pay only the minimum cost required. It's also an example of the extreme difference between using a feature-rich framework like React and the bare minimum to get the job done.


## Screen shots

Supports dark mode and light mode themes.

![Dark mode theme](./screenshots/dark.png)

![Light mode theme](./screenshots/light.png)


## Source Lines of Code comparison (2021-07-02)

These counts were produced by [Tokei](https://github.com/XAMPPRocky/tokei) using the `--no-ignore` argument to get an accurate count of all sources, including dependencies.

[`task-webapp`](https://github.com/parasyte/task-webapp/tree/8242850beffd1fa2b361bfb3164fd80042cd45d2) (this project):

```text
===============================================================================
 Language            Files        Lines         Code     Comments       Blanks
===============================================================================
 CSS                     3          252          206           11           35
 JavaScript              4          175          130           16           29
-------------------------------------------------------------------------------
 HTML                    1           46           40            0            6
 |- HTML                 1            6            6            0            0
 (Total)                             52           46            0            6
===============================================================================
 Total                   8          473          376           27           70
===============================================================================
```

[`todomvc/examples/vanilla-es6`](https://github.com/tastejs/todomvc/tree/4e301c7014093505dcf6678c8f97a5e8dee2d250/examples/vanilla-es6):

```text
===============================================================================
 Language            Files        Lines         Code     Comments       Blanks
===============================================================================
 CSS                     2          520          436            9           75
 HTML                    1           45           45            0            0
 JavaScript              9         1011          632          284           95
 JSON                    1           14           14            0            0
-------------------------------------------------------------------------------
 Markdown                1           40            0           23           17
 |- BASH                 1            3            3            0            0
 (Total)                             43            3           23           17
===============================================================================
 Total                  14         1630         1127          316          187
===============================================================================
```

[`todomvc/examples/react`](https://github.com/tastejs/todomvc/tree/4e301c7014093505dcf6678c8f97a5e8dee2d250/examples/react):

```text
===============================================================================
 Language            Files        Lines         Code     Comments       Blanks
===============================================================================
 CSS                     2          517          433            9           75
 HTML                    1           32           27            3            2
 JavaScript              7        38720        25086         9031         4603
 JSON                    1           22           22            0            0
 JSX                     3          355          285           28           42
 Markdown                1           37            0           21           16
===============================================================================
 Total                  15        39683        25853         9092         4738
===============================================================================
```
