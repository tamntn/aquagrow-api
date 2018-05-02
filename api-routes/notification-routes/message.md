# Message

{% api-method method="get" host="https://aquagrow.life/api" path="/message/:username" %}
{% api-method-summary %}
GET Message
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get all received messages of a user.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
username of an user
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Message successfully retrieved.
{% endapi-method-response-example-description %}

```javascript
{
    "message": "GET messages request successful",
    "data": [
        {
            "createdAt": "2018-04-13T09:39:19.000Z",
            "sender": "Nemo 🐟",
            "message": "How are you enjoying our app so far? We're rolling out a new update in a week with new features!",
            "_id": "5ad07ac7708b7a0014e4be16"
        },
        {
            "createdAt": "2018-04-16T22:07:15.000Z",
            "sender": "Erik Hodges",
            "message": "Hey man how's your system doing? Mine's been incredible! 😍",
            "_id": "5ad51e9309433d7d540afb89"
        }
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://aquagrow.life/api" path="/message/:username" %}
{% api-method-summary %}
POST Message
{% endapi-method-summary %}

{% api-method-description %}
Create a new message and push it to an existing user
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
username of an user
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-body-parameters %}
{% api-method-parameter name="message" type="string" required=true %}
the text of the message
{% endapi-method-parameter %}

{% api-method-parameter name="sender" type="string" required=true %}
the sender of the message
{% endapi-method-parameter %}

{% api-method-parameter name="createdAt" type="object" required=true %}
timestamp of the message
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
We will receive successful message and a list of existing messages.
{% endapi-method-response-example-description %}

```javascript
{
    "message": "POST message request successful",
    "data": [
        {
            "createdAt": "2018-04-13T09:39:19.000Z",
            "sender": "Nemo 🐟",
            "message": "How are you enjoying our app so far? We're rolling out a new update in a week with new features!",
            "_id": "5ad07ac7708b7a0014e4be16"
        },
        {
            "createdAt": "2018-04-16T22:07:15.000Z",
            "sender": "Erik Hodges",
            "message": "Hey man how's your system doing? Mine's been incredible! 😍",
            "_id": "5ad51e9309433d7d540afb89"
        }
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

