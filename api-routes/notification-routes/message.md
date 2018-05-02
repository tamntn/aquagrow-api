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
{% api-method-parameter name=":username" type="string" required=true %}
the username of an user
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
{% api-method-parameter name=":username" type="string" required=true %}
the username of an user
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

{% api-method method="delete" host="https://aquagrow.life/api" path="/message/:username/:id" %}
{% api-method-summary %}
DELETE One
{% endapi-method-summary %}

{% api-method-description %}
Delete a single message from an user
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name=":id" type="string" required=false %}
the unique id of the message
{% endapi-method-parameter %}

{% api-method-parameter name=":username" type="string" required=true %}
the username of an user
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Receive successful message and the list of all existing messages
{% endapi-method-response-example-description %}

```javascript
{
    "message": "DELETE single message request successful",
    "data": [
        {
            "createdAt": "2018-04-13T09:39:19.000Z",
            "sender": "Nemo 🐟",
            "message": "How are you enjoying our app so far? We're rolling out a new update in a week with new features!",
            "_id": "5ad07ac7708b7a0014e4be16"
        },
        {
            "createdAt": "2018-04-13T10:36:47.000Z",
            "sender": "Nemo 🐟",
            "message": "This is a very long message. The purpose is to test the notification styling when the message is long. You should be able to see everything on a tooltip. Yayyyyyy!",
            "_id": "5ad0883f708b7a0014e4be20"
        },
        {
            "createdAt": "2018-04-16T22:07:15.000Z",
            "sender": "Erik Hodges",
            "message": "Hey man how's your system doing? Mine's been incredible! 😍",
            "_id": "5ad51e9309433d7d540afb89"
        },
        {
            "createdAt": "2018-05-02T14:45:45.000Z",
            "sender": "Yeji Yoon",
            "message": "How are you? Don't forget to pick up your plants this afternoon!",
            "_id": "5ae9cf19bd1149001408b20e"
        }
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="delete" host="https://aquagrow.life/api" path="/message/:username" %}
{% api-method-summary %}
DELETE All
{% endapi-method-summary %}

{% api-method-description %}
Delete all messages from an user
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name=":username" type="string" required=false %}
the username of an user
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
    "message": "DELETE all messages request successful",
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



