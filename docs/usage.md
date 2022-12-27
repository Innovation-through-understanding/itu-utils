# Installation and usage

## Prerequisites

Make sure that you have an `.npmrc` file in the root of your project that contains at least the following line

```
@itu:registry=https://nexus.innovation-through-understanding.de/repository/itu-npm/
```

!> Note that you also need to login into the ITU nexus with your developer credentials for yarn to be able to retrieve the `@itu/utils` library.

## Assumptions

`@itu/utils` assumes that the following dependencies are installed in your project:

| Library          | Minimum version |
| :--------------- | :-------------: |
| luxon            |      3.1.1      |
| ramda            |     0.28.0      |
| tsmonads         |      2.7.1      |
| typescript       |      4.9.4      |
| reflect-metadata |     0.1.13      |

!> If your project does not meet those requirements, please make sure to add or update those dependencies. All ITU projects should make use of those libraries.
