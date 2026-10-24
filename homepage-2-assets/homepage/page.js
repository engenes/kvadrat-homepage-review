import {mountCompany} from './company.js';
import {mountAgencyGallery} from './agency-gallery.js';
import {mountInteractions} from './interactions.js';
import {enhanceSelect} from '../select.js';
import {mountPromotions} from './promotions.js';
import {mountCardGlows} from './card-glow.js';

document.querySelectorAll('.property-search select').forEach(select => enhanceSelect(select, {compact: true}));
mountInteractions();
mountPromotions();

mountCompany();
mountAgencyGallery();
mountCardGlows();
