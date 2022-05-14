jenkins.model.Jenkins.instance.items.each { job ->
    println "Name: ${job.name}"
}
