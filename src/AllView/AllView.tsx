import React from 'react';
import "./AllView.scss";
import { Sample, ViewProps } from "./../tools/Samples.model";

const AllView = ({samples, visible}:ViewProps):JSX.Element => {

    return (
        <div className="view__all" style={{display: (visible ? 'flex' : 'none')}}>
            {samples.map((data:Sample,n:number):JSX.Element => {
                return (
                    <div key={n} className="content content--viewall">
                        <div>
                            <img src={"/images/" + data.images[0].filename} alt="Portfolio Sample" className="content__icon" />
                        </div>
                        <div>
                            <div className="content__title">{data.name}</div>
                            <div className="content__description">{data.description}</div>
                            <a href="{data.url}" className="content__link" target="_blank">{data.url}</a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AllView;