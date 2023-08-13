module.exports = {
    rabbitmqUrl: `amqp://${process.env.RABBITMQ_HOST}`,
    emailServiceQueue: 'EMAIL_SERVICE',
    elasticsearchServiceQueue: 'ELASTICSEARCH_SERVICE'
}