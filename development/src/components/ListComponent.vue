<template>
  <div>
    <article class="table-columns" v-for="match in allMatches" :key="match._id">  
        <div class="table-column-info">
            <div class="table-column-id">
                {{match._id}}
            </div>
            <div class="table-column-match">
                <div class="table-column-home">
                    {{match.teams.home.name}}
                </div>
                <div class="table-column-results">
                    {{match.result.home}} - {{match.result.away}}
                </div>
                <div class="table-column-away">
                    {{match.teams.away.name}}
                </div>
            </div>
            <div class="table-column-date">
                {{ parseDate(match.time.date) }}<br/>
                {{ parseTime(match.time.time) }}
            </div>
            <button class="table-btn--delete" v-on:click="deleteMatch(match._id)">
                Delete
            </button>
        </div>
    </article>
  </div>
</template>

<script>
import moment from 'moment';

export default {
    name: "ListComponent",
    computed:{
        allMatches(){
            return this.$store.getters.allDetailMatch  //utilizzo il getters per avere array partite quando chiamo il componente per la prima volta
        }
    },
    methods: {
        deleteMatch : function (match) {
            this.$store.dispatch('deleteStoreMatches',match)  //chiamo la action di delete nello store
        },
        parseDate : function (date) {
            return moment(date, 'DD/MM/YY').format('DD/MM/YYYY');
        },
        parseTime : function (time) {
            return moment(time, 'HH:mm').format('hh:mm A');
        }
    }
};
</script>

<style lang="scss">
$lightGrey: #f5eceb;
$darkGrey: #48494d;
$primary: #273652;
$secondary: #1c1919;

#table{
    position: relative;
    display: flex;
    flex-direction: column;
    width:65%;
    margin:2rem auto 3rem auto;
    border-radius: 0.5rem;
    color: #1c1919;
    @media screen and (max-width: 1023px) {
        width:90%;
    }
    @media screen and (max-width: 1400px) {
        width:90%;
    }
    .table-columns{
        background: white;
        font-size: 1.0rem;
        padding:2rem 1.5rem;
        border-bottom: 1px solid #f5eceb;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        @media screen and (max-width: 1023px) {
            padding:1rem;
            margin-bottom:2rem;
        }
        .table-column-id{
            font-size:0.8rem;
            font-weight: 600;
            color:#8f8b8b;
            @media screen and (max-width: 1023px) {
                align-self: flex-start;
                min-width: 100%;
            }
        }
        .table-column-info{
            display: flex;
            justify-content: space-around;
            flex-direction: row;
            align-items: center;
            @media screen and (max-width: 1023px) {
                flex-direction: column;
            }
            .table-column-match{
                @media screen and (max-width: 1023px) {
                    min-width: 100%;
                    justify-content: center;
                    margin:1.5rem 0rem;
                }
                display: flex;
                flex-direction: row;
                align-items: center;
                min-width: 45%;
                .table-column-away,.table-column-home{
                    @media screen and (max-width: 1023px) {
                        min-width: 33%;
                        font-size: 0.9rem;
                    }
                    @media screen and (max-width: 1400px) {
                        min-width: 35%;
                    }
                    min-width: 30%;
                }
                .table-column-home{
                    text-align: right;
                    font-weight: 300;
                    padding:0rem 1rem;
                }
                .table-column-results{
                    @media screen and (max-width: 1023px) {
                        font-size: 0.9rem;
                        min-width: 10%;
                    }
                    @media screen and (max-width: 1400px) {
                        width:10%;
                    }
                    background: #273652;
                    color: white;
                    padding:0.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                }
                .table-column-away{
                    text-align: left;
                    font-weight: 300;
                    padding:0rem 1rem;
                }
            }
            .table-column-date{
                font-size: 0.9rem;
                font-weight: 600;
                color: #48494d;
                text-align: center;
                min-width:10%;
                @media screen and (max-width: 1023px) {
                    margin-bottom:1.5rem;
                }
            }
        }
    }
    .table-btn--delete{
        border-radius: 0.3rem;
        border:0px;
        background: #ff2b2b;
        background-image: url('../assets/bin.svg');
        background-repeat: no-repeat;
        background-size: 0.8rem;
        background-position:0.3rem;
        padding:0.5rem 0.5rem 0.5rem 1.5rem;
        color:white;
        font-size: 1.0rem;
        cursor: pointer;
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
        &:hover{
            background: #73150d; 
            background-image: url('../assets/bin.svg');
            background-repeat: no-repeat;
            background-size: 0.8rem;
            background-position:0.3rem;
        }
    }
}
</style>