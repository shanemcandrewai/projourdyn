// Import our custom CSS
import '../scss/styles.scss';

import { Popover } from 'bootstrap';

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
[...popoverTriggerList].map((popoverTriggerEl) => new Popover(popoverTriggerEl));
