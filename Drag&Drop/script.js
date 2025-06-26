const items = document.querySelectorAll('.item');
const boxes = document.querySelectorAll('.box');

let draggedItem = null;
let originalBox = null;

items.forEach(item => {
    item.addEventListener('dragstart', function () {
        draggedItem = this;
        originalBox = this.parentElement;
        setTimeout(() => this.style.display = "none", 0);
    });

    item.addEventListener('dragend', function () {
        // If not dropped inside a box, return it to original
        if (!this.parentElement.classList.contains('box')) {
            originalBox.appendChild(this);
        }
        this.style.display = "block";
        draggedItem = null;
        originalBox = null;
    });
});

boxes.forEach(box => {
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragenter', dragEnter);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function dragLeave() {
    this.classList.remove('drag-over');
}

function drop() {
    this.classList.remove('drag-over');

    // Prevent dropping on text <p>
    if (draggedItem && !this.querySelector('p')) {
        this.appendChild(draggedItem);
    } else if (draggedItem) {
        this.insertBefore(draggedItem, this.querySelector('p'));
    }

    draggedItem.style.display = "block";
    draggedItem = null;
}
