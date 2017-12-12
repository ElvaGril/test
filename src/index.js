import modal from './components/modal'
import './reset.scss'
import './css/index.scss'

$('.monthToggle').click(function () {
    $(this).parent('h3').siblings('ul').slideToggle('slow');
    $(this).siblings('i').toggleClass('fa-caret-down fa-caret-right');
});
$('.yearToggle').click(function () {
    $(this).parent('h2').siblings('.timeline-month').slideToggle('slow');
    $(this).siblings('i').toggleClass('fa-caret-down fa-caret-right');
});


if (module.hot) {
    module.hot.accept('./components/modal', () => {
        const modal = require('./components/modal').default
        modal(+new Date())
    })
}
