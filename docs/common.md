# Das ist ein Guide

Und hier ist ein Bildchen:

[Alt text](./bildchen.drawio ':include :type=code')

> cite is yelp

!> **Zeit** ist _Geld_

?> Eine Frage wäre da noch

- [ ] Dies
- [x] Das
- [ ] Ananas

<details>
<summary>Self-assessment (Click to expand)</summary>

- Abc
- Abc

</details>

:100: :white_check_mark: :x: :heavy_exclamation_mark: :information_source:

[filename](src/test.ts ":include :type=code")

```typescript
type Foo<T> = Bar | BF<T>;
```

[filename](test.puml ":include :type=code")

```plantuml
@startuml
!include https://raw.githubusercontent.com/kirchsth/C4-PlantUML/extended/C4_Container.puml
!include https://raw.githubusercontent.com/bschwarz/puml-themes/master/themes/bluegray/puml-theme-bluegray.puml

Person(wiley, "Wile E. Coyote", "Boss von ACME Inc.")

Boundary(system, "Verarbeitung") {
System(post, "Postsystem", "mand", $tags="JAVA")
}
Container(cont, "Test", "Label", "Tag", $tags="v1")

Rel(wiley, system, "verwendet")

LAYOUT_WITH_LEGEND()
@enduml
```

<~ Whhop
