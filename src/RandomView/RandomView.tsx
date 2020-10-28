import React, { useState } from 'react';
import './RandomView.scss';
import { Sample, ViewProps } from "./../tools/Samples.model";
import { getRandom } from "../tools/Toolkit";

const RandomView = ({samples, visible}:ViewProps):JSX.Element => {

    // ------------------------------------------- event handlers
    const onRandom = (e:any):void => {
        // randomly select index of sample
        let index:number = getRandom(0, samples.length - 1);
        // update state variable which forces a render of all components
        setSelected(samples[index]);
    }

    // ----------------------------------------- main
    const [selected, setSelected] = useState<Sample>(samples[getRandom(0, samples.length - 1)]);

    // ------------------------------------------- rendering to the DOM
    return (
        <div className="view__selected" style={{display: (visible ? 'flex' : 'none')}}>
            <div className="nav">
                <input type="button" className="nav__button" value="Surprise Me!" onClick={onRandom} />
            </div>
            
            <div className="content">
                <div id="txtName" className="content__title">{selected.name}</div>
                <div id="txtDescription" className="content__description">{selected.description}</div>
                <div>
                    <a href="{selected.url}" target="_blank" id="lnkUrl" className="content__link">{selected.url}</a>
                </div>
                <div className="content__iconset">

                    <img src={"/images/" + selected.images[0].filename} alt="Portfolio Sample" className="content__icon"/>
                    <img src={"/images/" + selected.images[1].filename} alt="Portfolio Sample" className="content__icon content__icon--shrink"/>
                    <img src={"/images/" + selected.images[2].filename} alt="Portfolio Sample" className="content__icon content__icon--shrink"/>
                    <img src={"/images/" + selected.images[3].filename} alt="Portfolio Sample" className="content__icon content__icon--shrink"/>
                </div>
            </div>
        </div>
    );
}

export default RandomView;