# TypeScript List Application 📋

## About this project

I created this project to learn more about vanilla TypeScript. The code closely follows
[Dave Gray's](https://github.com/gitdagray) great course called
[TypeScript Project from Scratch](https://youtu.be/61v23Ce5SXA?si=_E8w379ge7it0jLx).

## Requirements

| Name       | Version |
|------------|---------|
| Node.js    | 20.8.0  |
| npm        | 10.2.0  |
| TypeScript | 5.3.3   |

## Generating TypeScript project

For generating a vanilla TypeScript project a tool called Vite can be used. It does the
scaffolding automatically using via the following terminal command:

```shell
npm create vite@latest
```

---

## Using Prettier on the project

### What is Prettier?

Prettier is an opinionated code formatter tool. It's pretty handy when it comes to
collaboration between developers.

### How to use Prettier with WebStorm on Mac

* Install Prettier with npm
* Webstorm Settings → Languages & Frameworks → JavaScript →
    1. Enable Prettier
    2. Enable _On 'Reformat Code' action_
    3. Enable _On save_

### Debugging Prettier with WebStorm on Mac

If, for some reason, Prettier doesn't work automatically on save, open the project in the Terminal and
try debugging Prettier with `prettier . --write`.

In my case, enabling the On save feature didn't work at all,
so I had to do this additional step:

Webstorm Settings → Tools → Actions on save → Tick _Reformat Code_

This should fix the problem of Prettier not running on save.

---

## Singleton design pattern

### What is the Singleton pattern?

The Singleton pattern restricts the instantiation of a class to one 'single' instance. This is useful
when exactly one object is needed.

In this project's case, only one `FullList` object can be created. This ensures the consistency of data
across the application.

### Major takeaways with Singletons

* A Singleton class should have a `static instance` field.
* A Singleton's constructor should always be private to prevent direct construction calls with the `new` operator.
* A Singleton class should provide a `static` method to access the single instance.

---
<details>
  <summary>Example: Singleton class with a static instance field</summary>

```typescript
// @formatter:off

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(
    private _list: ListItem[] = []
  ) {
  }
}

// @formatter:on
```

With this approach, you'd access the single instance by directly referencing the `instance` field:

```typescript
FullList.instance.load();
```

Here, `FullList.instance` refers to the single instance of `FullList`, and you're calling the `load()`
method on that instance. The key point is that the constructor of `FullList` is private.

</details>


<details>
  <summary>Example: Singleton class with a static method</summary>

```typescript
// @formatter:off

export default class FullList implements List {
  private static _instance: FullList;

  private constructor(
    private _list: ListItem[] = []
  ) {
  }

  public static getInstance(): FullList {
    if (!FullList._instance) {
      FullList._instance = new FullList();
    }
    return FullList._instance;
  }
}

// @formatter:on
```

With this approach, you'd access the single instance using a static method `getInstance()`:

```typescript
const myListInstance = FullList.getInstance();
myListInstance.load();
```

</details>

---

## TypeScript parameter properties

In TypeScript when you declare a constructor parameter with an access modifier (such as `private` or `public`),
TypeScript implicitly creates a class member with that name and assigns the value of the parameter to it.
This shorthand notation saves you from explicitly declaring the member separately, reducing the boilerplate code.


---

## Rendering the list to the DOM

First, we clear the DOM, then we create the HTML elements (`li`, `checkbox`) using a
`FullList` typed object. This object implements the `List` interface, thus it has a
`ListItem` array that we can work with.

### Dynamic HTML list item element creation

This code can be found in `src/templates/ListTemplate.ts`. The generated `li` elements
will be placed into an `ul` element of the DOM that has the id of `listItems`.

```ts
// @formatter:off

render(fullList: FullList) {
  this.clear();
  fullList.list.forEach((item) => {
    const li = document.createElement('li') as HTMLLIElement;
    li.className = 'item';

    const check = document.createElement('input') as HTMLInputElement;
    check.type = 'checkbox';
    check.id = item.id;
    check.checked = item.checked;
    li.append(check);
  });
}

// @formatter:on
```

This is how a generated `li` element would look like in the DOM:

```html

<li class='item'>
  <input type='checkbox' id='1'>
  <label for='1'>eat</label>
  <button class='button'>X</button>
</li>
``` 




