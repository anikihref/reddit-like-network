const menus: Array<(arg: boolean) => void> = [];
const refs: { current: any }[] = [];

function closeContextMenuListener(e: MouseEvent) {
  // отримуємо всі кнопки які можуть викликати контекстне меню
  const triggers = Array.from(
    document.querySelectorAll('[data-context-trigger="true"]')
  );

  // якщо ми клікнули на елемент всередині трігера то контекстне меню не відкриється
  // тому якщо по вспливанню вверх по елементам э трігер то нам потрібно зробити його null
  const target = (e.target as HTMLDivElement).closest(
    '[data-context-trigger="true"]'
  )
    ? null
    : e.target;

  // якщо місце куди ми клікнули не дорівнює контекстному меню або трігеру то ми закриваємо усі контекстні меню
  if (
    refs.every((ref, i) => {
      return ref.current !== target && target !== triggers[i];
    })
  ) {
    menus.forEach((stateChanger) => {
      stateChanger(false);
    });
  }
}

// викликати потрібно лише один раз та з аргументами. Далі воно кешує все у локальні змінні
export default function contextMenuCloser() {
  document.addEventListener('click', closeContextMenuListener);
}

export function addContextMenu(
  setMenuState: (arg: boolean) => void,
  ref: React.RefObject<HTMLDivElement> | React.RefObject<HTMLButtonElement>
) {
  menus.push(setMenuState);
  refs.push(ref);
}

export function removeContextMenuCloser() {
  document.removeEventListener('click', closeContextMenuListener);
}
