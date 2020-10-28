import React from 'react';
import './SelectedView.scss';
import { ViewProps, Sample } from "./../tools/Samples.model";

const SelectedView = ({samples, visible}:ViewProps):JSX.Element => {

    // state variable setup
    const [selected, setSelected] = React.useState<Sample>(samples[0]);

    // ------------------------------------------- event handers
    const onChangeSample = (e:any):void => {
        // update state variable which forces a render of this components
        setSelected(samples[e.target.value]);
    }

    // ------------------------------------------- rendering to the DOM
    return (
        // ------------------------------------------- challenge solution
        <div className="view__selected" style={{display: (visible ? 'flex' : 'none')}}>
        {/* ------------------------------------------------------------- */}
            <div className="nav">
                <select id="lstSamples" className="nav__menu" onChange={onChangeSample}>
                    {samples.map((data:Sample,n:number):JSX.Element => {
                        return <option key={n} value={n}>{data.name}</option>
                    })}
                </select>
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

export default SelectedView;