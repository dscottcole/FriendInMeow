import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";

import 'tui-chart/dist/tui-chart.css'
import {BarChart} from '@toast-ui/react-chart'

import 'tui-chart/dist/maps/world';
import {MapChart} from '@toast-ui/react-chart';
 

const BreedChart = (props) => {

    let breed = props.clickedBreed

    const [fiverArray, setFiverArray] = useState([])

    const createFiverArray = () => {
        let preFiver = [breed.adaptability, breed.affection_level, breed.child_friendly, breed.dog_friendly, breed.energy_level, breed.grooming, breed.health_issues, breed.intelligence, breed.shedding_level, breed.social_needs, breed.stranger_friendly, breed.vocalisation]
        setFiverArray(preFiver)
    }

    useEffect(() => {
        createFiverArray()
    }, [props.clickedBreed])


    const data = {
        categories: ['Adaptability', 'Affection Level', 'Child Friendly', 'Dog Friendly', 'Energy Level', 'Grooming Needed', "Health Issues", "Intelligence", "Shedding Level", "Social Needs", "Stranger-Friendly", "Vocalization"],
        series: [
            {
                name: 'Attribute',
                data: fiverArray
            }
        ]
    };
      
    const options = {
        chart: {
                width: 700,
                height: 600,
                title: {
                    text: `${breed.name} Traits`,
                    align: 'center'
                },
                format: '1',
            },
            yAxis: {
                title: 'Trait',
                labelMargin: 5
            },
            xAxis: {
                title: 'Trait Scale',
                labelInterval: 1,
                tickInterval: 'auto',
                min: 0,
                max: 5
            },
            series: {
                showLabel: true
            },
            legend: {
                visible: false
            }
        };

        const breedChart = (
            <BarChart data={data} options={options} />
        )
        
        let data2 = {
            series: [
                {
                    code: breed.country_code,
                    data: 1
                }
            ]
        };
        var options2 = {
            chart: {
                width: 700,
                height: 600,
                title: {
                    text: `${breed.name}'s Country of Origin: ${breed.origin}`,
                    align: 'center'
                },
                format: '0'
            },
            map: 'world',
            legend: {
                align: 'bottom',
                visible: false
            }
        };
        // var theme = {
        //     series: {
        //         startColor: '#ffefef',
        //         endColor: '#ac4142',
        //         overColor: '#75b5aa'
        //     }
        // };

        // For apply theme

        // tui.chart.registerTheme('myTheme', theme);
        // options.theme = 'myTheme';


    return (
        <div className="breed-chart">
            <MapChart data={data2} options={options2} />
            {fiverArray.length > 0? breedChart : null}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName })
    }
}
  
const mapStateToProps = (state) => {
    return {
        ...state.catState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedChart);