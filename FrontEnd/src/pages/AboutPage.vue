<template>
    <div id="about">
        <div>
            This page made by Shahar Horovitz and Amit Yosefi
            <br><br>
            our previous projects are:
            <br><br>
            our packman
            <a href="https://web-development-environments-2021.github.io/Assignment2_208472001_311277438/">Packman site</a>
            <br><br>
            our Api 3.1
            <a href="https://app.swaggerhub.com/apis-docs/amittt2/208472001_311277438/1.0.0">Api project</a>
            <br><br>
            our Backend project
            <a href="https://github.com/Web-Development-Environments-2021/assignment-3-2-208472001_311277438">Backend git</a>
            <br><br><br><br>
        </div>
        <div>
            <b-button v-b-toggle.collapse-1 variant="primary">Click here for more information about the owners</b-button>
            <b-collapse id="collapse-1" class="mt-2">
                <b-card>
                <p class="card-text">
                    <br>
                    Shahar Horovitz: 24 years old
                    <br>
                    Amit Yosefi: 27 years old
                </p>
                </b-card>
            </b-collapse>
        </div>
    </div>  
</template>

<script>
</script>

<style>
    #about{
        /* padding: 1cm; */
        margin-top: 5%;
        text-align: center;
    }
</style>
