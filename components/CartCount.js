import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
    background: var(--red);
    color: white;
    margin: 0 10px;
    padding: 4px;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
    position: relative;
    .count {
        display: block;
        position: relative;
        transition: transform 0.4s;
        backface-visibility: hidden;
    }
    .count-enter {
        transform: scale(4) rotateX(0.5turn);
    }
    .count-enter-active {
        transform: rotateX(0);
    }
    .count-exit {
        position: absolute;
        top: 0;
        transform: rotateX(0);
    }
    .count-exit-active {
        background: #fff;
        transform: scale(4) rotateX(0.5turn);
    }
`;

export default function CartCount({ count }) {
    return (
        <AnimationStyles>
            <TransitionGroup>
                <CSSTransition 
                    unmountOnExit 
                    className='count' 
                    classNames='count'
                    key={count}
                    timeout={{ enter: 400, exit: 400 }}
                >
                    <Dot>{count}</Dot>
                </CSSTransition>
            </TransitionGroup>
        </AnimationStyles>
    );
}