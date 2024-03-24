import './css/style.css';
import FullList from './model/FullList.ts';
import ListItem from './model/ListItem.ts';
import ListTemplate from './templates/ListTemplate.ts';

const initApp = () => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  /*
   * Defining form HTML element for adding items and listening to its submit event
   */

  const itemEntryForm = document.getElementById(
    'itemEntryForm'
  ) as HTMLFormElement;

  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();

    const input = document.getElementById('newItem') as HTMLFormElement;
    const newEntryText: string = input.value.trim();

    if (!newEntryText) {
      return;
    }

    // TODO: Ternary statements

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemId.toString(), newEntryText);

    fullList.addItem(newItem);

    template.render(fullList);
  });

  /*
   * Defining the clear items button HTML element and listen to its click event
   */

  const clearItems = document.getElementById(
    'clearItemsButton'
  ) as HTMLButtonElement;

  clearItems.addEventListener('click', (): void => {
    fullList.clearList(); // clearing data
    template.clear(); // clearing ui
  });

  /*
   * Load the list data and render it to the DOM
   */

  fullList.load();
  template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
