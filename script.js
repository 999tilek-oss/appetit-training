<script>
document.addEventListener('DOMContentLoaded', function() {
    console.log('APPETIT System Initialized');
    
    let selectedRole = null;
    let userProgress = {
        completedLessons: [],
        quizScores: {},
        totalHours: 0,
        certificates: [],
        internshipHours: 16,
        mentorRating: 4.5
    };

    // Инициализация навигации
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    // Инициализация выбора должности
    document.querySelectorAll('.role-card').forEach(card => {
        card.addEventListener('click', function() {
            selectRole(this.getAttribute('data-role'));
        });
    });

    // Кнопка начала обучения
    document.getElementById('startTraining').addEventListener('click', function() {
        if (selectedRole) {
            showSection('training');
            loadTrainingContent();
        } else {
            alert('Пожалуйста, выберите должность!');
        }
    });

    // Кнопка запроса обратной связи
    document.getElementById('requestFeedback')?.addEventListener('click', function() {
        alert('Запрос обратной связи отправлен наставнику!');
    });

    // Адаптационные карточки
    document.querySelectorAll('.adaptation-card').forEach(card => {
        card.addEventListener('click', function() {
            showAdaptationSheet(this.getAttribute('data-role'));
        });
    });

    // Функция показа секции
    function showSection(sectionName) {
        // Скрыть все секции
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Показать выбранную секцию
        const sectionElement = document.getElementById(sectionName);
        if (sectionElement) {
            sectionElement.classList.add('active');
        }
        
        // Обновить активную вкладку
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    // Функция выбора должности
    function selectRole(role) {
        console.log('Selecting role:', role);
        
        // Убрать выделение со всех карточек
        document.querySelectorAll('.role-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Выделить выбранную карточку
        const selectedCard = document.querySelector(`[data-role="${role}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        selectedRole = role;
        // Разблокировать кнопку
        document.getElementById('startTraining').disabled = false;
        
        console.log('Selected role:', role);
    }

    // Функция загрузки контента обучения
    function loadTrainingContent() {
        if (!selectedRole) return;
        
        const courseContent = document.getElementById('courseContent');
        const courses = {
            manager: {
                title: 'Менеджер смены',
                lessons: [
                    { id: 'm1', title: 'Основы управления командой', duration: '45 мин', content: 'Принципы руководства, мотивация сотрудников' },
                    { id: 'm2', title: 'Стандарты обслуживания APPETIT', duration: '60 мин', content: 'Корпоративные стандарты, качество сервиса' },
                    { id: 'm3', title: 'Работа с жалобами клиентов', duration: '40 мин', content: 'Разрешение конфликтов, удержание клиентов' },
                    { id: 'm4', title: 'Контроль качества продукции', duration: '50 мин', content: 'HACCP, температурные режимы, сроки годности' },
                    { id: 'm5', title: 'Планирование смены и отчетность', duration: '55 мин', content: 'Составление графиков, ведение документации' }
                ]
            },
            cashier: {
                title: 'Кассир',
                lessons: [
                    { id: 'c1', title: 'Работа с кассовым аппаратом', duration: '30 мин', content: 'Основные функции, пробитие чеков' },
                    { id: 'c2', title: 'Меню и цены APPETIT', duration: '45 мин', content: 'Изучение ассортимента, акции и скидки' },
                    { id: 'c3', title: 'Общение с клиентами', duration: '35 мин', content: 'Стандартные фразы, вежливое обслуживание' },
                    { id: 'c4', title: 'Обработка платежей', duration: '40 мин', content: 'Наличные, карты, бонусы, возвраты' },
                    { id: 'c5', title: 'Кассовая дисциплина', duration: '25 мин', content: 'Инкассация, пересчет, ответственность' }
                ]
            },
            service: {
                title: 'Раздача',
                lessons: [
                    { id: 's1', title: 'Организация рабочего места', duration: '25 мин', content: 'Расположение продуктов, чистота зоны' },
                    { id: 's2', title: 'Контроль заказов', duration: '35 мин', content: 'Проверка комплектности, сверка с чеком' },
                    { id: 's3', title: 'Упаковка заказов', duration: '30 мин', content: 'Правильная упаковка, сохранение температуры' },
                    { id: 's4', title: 'Взаимодействие с кухней', duration: '20 мин', content: 'Координация с поварами, приоритеты заказов' },
                    { id: 's5', title: 'Санитарные нормы', duration: '40 мин', content: 'Личная гигиена, чистота оборудования' }
                ]
            },
            assembler: {
                title: 'Сборщик',
                lessons: [
                    { id: 'a1', title: 'Стандарты сборки бургеров', duration: '40 мин', content: 'Последовательность ингредиентов, граммовки' },
                    { id: 'a2', title: 'Работа с горячими блюдами', duration: '35 мин', content: 'Температурные режимы, сроки готовности' },
                    { id: 'a3', title: 'Контроль качества', duration: '30 мин', content: 'Внешний вид продукции, соответствие стандартам' },
                    { id: 'a4', title: 'Скорость и эффективность', duration: '45 мин', content: 'Оптимизация процесса, работа в команде' },
                    { id: 'a5', title: 'Безопасность на кухне', duration: '25 мин', content: 'Работа с горячими поверхностями, ножами' }
                ]
            },
            prep: {
                title: 'Заготовщик',
                lessons: [
                    { id: 'p1', title: 'Подготовка овощей', duration: '50 мин', content: 'Правильная нарезка, хранение, сроки' },
                    { id: 'p2', title: 'Контроль запасов', duration: '40 мин', content: 'Система FIFO, ротация продуктов' },
                    { id: 'p3', title: 'Санитария и гигиена', duration: '35 мин', content: 'Обработка продуктов, чистота инвентаря' },
                    { id: 'p4', title: 'Работа с поставками', duration: '30 мин', content: 'Приемка товара, проверка качества' },
                    { id: 'p5', title: 'Планирование заготовок', duration: '45 мин', content: 'Расчет потребности, оптимизация процесса' }
                ]
            }
        };

        const course = courses[selectedRole];
        if (!course) return;

        courseContent.innerHTML = `
            <h3 style="color: #E94A4E; margin-bottom: 1.5rem;">Обучение: ${course.title}</h3>
            <div class="lessons-list">
                ${course.lessons.map((lesson, index) => `
                    <div class="lesson-item ${userProgress.completedLessons.includes(lesson.id) ? 'completed' : ''}" 
                         data-lesson="${lesson.id}">
                        <div class="lesson-title">${index + 1}. ${lesson.title}</div>
                        <div class="lesson-duration">⏱️ ${lesson.duration}</div>
                        <p style="margin-top: 0.5rem; color: #666;">${lesson.content}</p>
                        <button class="btn secondary" onclick="completeLesson('${lesson.id}')">
                            ${userProgress.completedLessons.includes(lesson.id) ? '✅ Завершено' : '▶️ Начать урок'}
                        </button>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 2rem; text-align: center;">
                <button class="btn success" onclick="startQuiz()">
                    Пройти тестирование
                </button>
            </div>
        `;
    }

    // Глобальные функции для onclick
    window.completeLesson = function(lessonId) {
        if (!userProgress.completedLessons.includes(lessonId)) {
            userProgress.completedLessons.push(lessonId);
            userProgress.totalHours += 0.5;
            saveProgress();
            loadTrainingContent();
            updateProgressDisplay();
            alert('Урок завершен!');
        }
    };

    window.startQuiz = function() {
        if (!selectedRole) return;
        alert('Тестирование будет доступно после завершения всех уроков!');
    };

    function showAdaptationSheet(role) {
        const modal = document.createElement('div');
        modal.className = 'adaptation-modal';
        modal.innerHTML = `
            <div class="adaptation-modal-content">
                <button class="modal-close" onclick="this.closest('.adaptation-modal').remove()">×</button>
                <h3>Адаптационный лист: ${role}</h3>
                <div class="adaptation-content">
                    <p>Содержимое адаптационного листа для ${role}</p>
                    <ul>
                        <li>Пункт 1</li>
                        <li>Пункт 2</li>
                        <li>Пункт 3</li>
                    </ul>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    function saveProgress() {
        localStorage.setItem('appetitProgress', JSON.stringify(userProgress));
    }

    function loadProgress() {
        const saved = localStorage.getItem('appetitProgress');
        if (saved) {
            userProgress = JSON.parse(saved);
        }
    }

    function updateProgressDisplay() {
        document.getElementById('completedLessons').textContent = userProgress.completedLessons.length;
        document.getElementById('totalHours').textContent = userProgress.totalHours;
        document.getElementById('internshipHours').textContent = userProgress.internshipHours;
        document.getElementById('mentorRating').textContent = userProgress.mentorRating;
    }

    // Загрузка прогресса при старте
    loadProgress();
    updateProgressDisplay();
});
</script>