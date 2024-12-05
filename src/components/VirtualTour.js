import React from 'react';

const VirtualTour = ({ city }) => {
    return (
        <div className="virtual-tour">
            <h2>Виртуальный тур по {city.name}</h2>

            {/* Ссылка на Яндекс Панораму */}
            <p>Посмотрите панораму города: <a href={`https://yandex.ru/maps/-/CHAsmDix`} target="_blank" rel="noopener noreferrer">Яндекс Панорама</a></p>

            {/* Вставка виджета Яндекс карты с панорамой */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <a
                    href="https://yandex.ru/maps/74/yakutsk/?utm_medium=mapframe&utm_source=maps"
                    style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Якутск
                </a>
                <a
                    href="https://yandex.ru/maps/74/yakutsk/?l=stv%2Csta&ll=129.723056%2C62.030728&panorama%5Bair%5D=true&panorama%5Bdirection%5D=173.464854%2C-32.645945&panorama%5Bfull%5D=true&panorama%5Bid%5D=1847569113_600643505_23_1658037367&panorama%5Bpoint%5D=129.722908%2C62.030783&panorama%5Bspan%5D=113.086909%2C60.000000&utm_medium=mapframe&utm_source=maps&z=20"
                    style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Карта Якутска с улицами и номерами домов — Яндекс Карты
                </a>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?l=stv%2Csta&ll=129.723056%2C62.030728&panorama%5Bair%5D=true&panorama%5Bdirection%5D=173.464854%2C-32.645945&panorama%5Bfull%5D=true&panorama%5Bid%5D=1847569113_600643505_23_1658037367&panorama%5Bpoint%5D=129.722908%2C62.030783&panorama%5Bspan%5D=113.086909%2C60.000000&z=20"
                    width="560"
                    height="400"
                    frameBorder="1"
                    allowFullScreen="true"
                    style={{ position: 'relative' }}
                />
            </div>
        </div>
    );
};

export default VirtualTour;
