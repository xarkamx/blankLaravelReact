import React, { Component } from 'react';
/**
 * @description componente para crear las tabs en tab container
 * @props {boolean} active (define si esta pantalla estara activa por defecto)
 * @props {string} title
 * @props {jsxObject} children (tags y componentes dentro del tag) 
 */
export class TabsBlock extends Component {
    render() {
        const { title } = this.props;
        const activated = "tab-pane fade in active";
        return (
            <div id={title} className={activated}>
                <div>{this.props.children}</div>
            </div>
        );
    }
}