# BEACH HACK 5


The Dataset was compiled using the fishwatch website (https://www.fishwatch.gov/developers) 

## PROBLEM STATEMENT :
Fishermen often do not receive the required reward for their hard work due intermediate
agencies present. Major profits are often grabbed by these intermediate agencies. A person
owning a waterbody is not aware of what is an ideal species that can be cultivated in that
area. Often they cultivate the wrong species that fail to survive resulting in financial and time
loss. Our application aims to provide ideal aquatic conditions for a species based on a
waterbody and a market that connects fishermen directly to the users
<br /><br />

## SOLUTION:
We use aquatic data taken from a sample of the fishing habitat and recommend fish species
which have the ideal living conditions in this habitat.We use a recommendation system
trained on a dataset which contains the aquatic data as independent x-variables and the
species of the fish as the y-label.
We also act as a medium where we allow fishermen to directly sell their fish to the end users
thereby removing the middleman and this is done by a single post!!!.
The fisherman posts a request onto the site which is viewed by the end users and on clicking
on a particular post the fish or any by-products is directly supplied to the end users.
The end users can be restaurants or local consumers. This enables fishermen to get a
greater share for their hard work and end users to receive the products at cheaper price
compared to when buying from local agents.
There is also a feature that allows the users to view the nutritional information of a specific fish species.
<br /><br />

## ASSUMPTIONS

We assume that the end user, hoping to predict the suitable classes of fishes, have the means to calculate the pH, dH [Hardness] and temp of the water body sample. Also the temp calculation should be done on multiple times a day and calculating the average of those values.
<br /><br />

## TECHSTACK USED

Backend - FastAPI, Python 

Frontend - React, HTML, CSS, JS

Database - Sqlite
<br /><br />

## REFERENCES


 - [FishBase Website](https://fishbase.net.br/search.php)
 - [FishBase API Docs](https://ropensci.github.io/fishbaseapidocs/)
 - [FishWatch API Reference](https://www.fishwatch.gov/developers)
 <br /><br />
  - [FastAPI Docs](https://fastapi.tiangolo.com/)
  - [React Docs](https://reactjs.org/docs/getting-started.html)




