import fs from 'fs'
import { Router } from 'express'

const router = Router()

async function loadModuleDynamically(file) {
    try {
        const module = await import(file)
        if (!module.default) {
            throw new Error(`Module ${file} does not export a default value`)
        }
        return module.default
    } catch (error) {
        console.error("Dynamic module import error:", error)
        throw error // Re-throw the error to handle it in the calling function
    }
}

function fileNames(path, routeList) {
    const files = fs.readdirSync(path)

    return files.map((file) => {
        let filepath = `${path}/${file}`
        const fileStat = fs.statSync(filepath)

        if(fileStat.isDirectory()) {
            return fileNames(filepath, routeList)
        } else {
            return routeList.push({
                baseUrl: path.replace("src/routes", ""),
                modulePath: `../../${filepath}`
            })
        }
    })
}

export default async function assignRoute() {
    try {
        let routeList = []
        fileNames('src/routes', routeList)
        for(let x of routeList) {
            const moduleRouter = await loadModuleDynamically(x.modulePath)
            if (moduleRouter) {
                router.use(`${x.baseUrl}`, moduleRouter)
            }
        }
        return router
    } catch (error) {
        console.error("Error assigning routes:", error)
        throw error
    }
}
