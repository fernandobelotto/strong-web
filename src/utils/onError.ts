import { Observable } from '@apollo/client'

export const onError = errorHandler => (operation, forward) => {
  return new Observable(observer => {
    let sub: any
    let retriedSub: any
    let retriedResult: any

    try {
      sub = forward(operation).subscribe({
        next: result => {
          if (result.errors) {
            retriedResult = errorHandler({
              graphQLErrors: result.errors,
              response: result,
              operation,
              forward,
            })

            if (retriedResult) {
              retriedSub = retriedResult.subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              })
              return
            }
          }
          observer.next(result)
        },
        error: networkError => {
          retriedResult = errorHandler({
            operation,
            networkError,
            // Network errors can return GraphQL errors on for example a 403
            graphQLErrors: networkError?.result?.errors,
            forward,
          })
          if (retriedResult) {
            retriedSub = retriedResult.subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            })
            return
          }
          observer.error(networkError)
        },
        complete: () => {
          // disable the previous sub from calling complete on observable
          // if retry is in flight.
          if (!retriedResult) {
            observer.complete.bind(observer)()
          }
        },
      })
    } catch (e) {
      errorHandler({ networkError: e, operation, forward })
      observer.error(e)
    }

    return () => {
      if (sub) sub.unsubscribe()
      if (retriedSub) sub.unsubscribe()
    }
  })
}
