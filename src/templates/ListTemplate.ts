import FullList from '../model/FullList.ts';

interface DOMList {
  ul: HTMLUListElement;

  clear(): void;

  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;
  input: HTMLInputElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement;
    this.input = document.getElementById('newItem') as HTMLInputElement;
  }

  clear() {
    this.ul.innerHTML = '';
    this.input.value = '';
  }

  /*
   * Rendering the list to the DOM. First, we clear the DOM, then we create the HTML
   * elements (li, checkbox) using a FullList typed object. This object implements the
   * List interface, thus it has a ListItem array that we can work with.
   *
   * The newly created li elements will look like this:
   * <li class="item">
   *    <input type="checkbox" id="1">
   *    <label for="1">eat</label>
   *    <button class="button">X</button>
   * </li>
   *
   * This li elements will be placed into an ul element that has an id of 'listItems'.
   */

  render(fullList: FullList) {
    // Clearing the list

    this.clear();

    fullList.list.forEach((item) => {
      // Defining list item HTML element

      const li = document.createElement('li') as HTMLLIElement;
      li.className = 'item';

      // Defining checkbox and its properties, and adding it to the given list item

      const check = document.createElement('input') as HTMLInputElement;
      check.type = 'checkbox';
      check.id = item.id;
      check.checked = item.checked;
      li.append(check);

      check.addEventListener('change', () => {
        item.checked = !item.checked;
        fullList.save();
      });

      // Defining label and its properties, and adding it to the given list item

      const label = document.createElement('label') as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      // Defining item delete button and its properties, and adding it to the given list item

      const button = document.createElement('button') as HTMLButtonElement;
      button.className = 'button';
      button.textContent = 'X';
      li.append(button);

      button.addEventListener('click', () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}
