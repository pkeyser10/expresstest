import React, { useState } from 'react';
import './SearchView.scss';
import { Sample, ViewProps } from "./../tools/Samples.model";

const SearchView = ( { samples, visible }:ViewProps ):JSX.Element => {

    // ------------------------------------------- event handlers
    const onSubmit = (e:any):void => {
        // if keyword is blank then return undefined by default (find() below fails at doing this
        if (keyword == "") {
            setSelected(undefined);
            return;
        }

        // search through all samples and find keyword in the name

        // the find() method returns either a Sample object or undefined (if no match found)
        // in typescript can define both using |
        let sample:Sample | undefined = samples.find(element => {
            let name:string = element.name.toLowerCase();
            return name.includes(keyword.toLowerCase());
        });
        setSelected(sample);
    };

    // setup state variables
    const [selected, setSelected] = useState<Sample>(); // set to undefined by default
    const [keyword, setKeyword] = useState("");

    return (    
        <div className="view__selected" style={{display: (visible ? 'flex' : 'none')}}>
            <div className="nav">
                {/* as the user types into the textbox below the state variable is updated accordingly
                state variable can be used later (this is basically data binding - one way)
                this is the basic pattern used when working with forms
                added feature to blank out the textbox when it is clicked by setting state variable to "" on click  */}
                <div><input type="text" className="nav__text" onClick={() => setKeyword("")} value={keyword} onChange={(e:any):void => setKeyword(e.target.value)} /></div>
                <div><input type="button" className="nav__button" value="Search" onClick={onSubmit} /></div>                

            </div>

            {(selected !== undefined) ?
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
            :
                <div className="content">
                    <div className="content__title">No matches found...</div>
                </div>
            }
        </div>
    )
}

export default SearchView;