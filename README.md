## Плагин выполнил: Образцов Артем М3103
### название: "plagin"
Функционал данного плагина представляет из себя несколько функций.

Это расширение для VS Code отслеживает время работы над проектом и автоматически переключается между светлой и тёмной темами в зависимости от времени суток.

После подключения можно включать отсчёт и выключать с помощью горячих клавиш ```ctrl+n``` для включения и ```ctrl+m``` для выключения.

Для того,чтобы пользоваться данным плагином должна быть гифка в дирректории ` media `, для более удобного времени можно менять предпочтительные для вас темы в файле `src/extension.ts` 
```
function setTheme() {
    const hour = new Date().getHours();
    const config = vscode.workspace.getConfiguration('my-extension');

    let theme = '';
    if (hour >= 0 && hour < 8) {
        theme = config.get<string>('Default Dark+')!;
    } else if (hour >= 8 && hour < 17) {
        theme = config.get<string>('Default Light+')!;
    } else {
        theme = config.get<string>('Default Dark+')!;
    }

    const currentTheme = vscode.workspace.getConfiguration().get('workbench.colorTheme');
    if (currentTheme !== theme) {

        vscode.workspace.getConfiguration().update('workbench.colorTheme', theme, true);
    }
}
 ```
Так же там можно поменять время для изменения тем, и интервал изменения темы.

Время в данном проекте считается по секундам,что тоже можно изменить в  файле `src/extension.ts` 
```
setInterval(() => {
        const now = new Date();
        const elapsed = startTime ? Math.floor((now.getTime() - startTime.getTime()) / 1000) : 0;
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60; 
        statusBarItem.text = `⏳ ${hours}ч ${minutes}мин ${seconds}сек в проекте`;
        statusBarItem.show();
    }, 1000); 
```
 Для создания проекта в терминале ввёл команду `yo code`, после чего настроил для себя проект и далее писал функции в файле `src/extension.ts` и добавлял корректировки в `package.json`