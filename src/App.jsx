import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://2eaizrs14f.execute-api.us-east-2.amazonaws.com/geolocation')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setData(json || {}))
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
  }, [])

  const statusMessage = error
    ? 'No se pudieron cargar los datos. La tabla se muestra vacía.'
    : Object.keys(data).length === 0
    ? 'Cargando datos...'
    : null

  const formatCell = (value) => {
    if (value == null) return '—'
    if (typeof value === 'object') return value.name ?? JSON.stringify(value)
    return value
  }

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='container'>
        <h1 className='text-center'>Lambda Geolocation IP</h1>
        {statusMessage && <p className='text-center text-muted'>{statusMessage}</p>}

        <div className='table-responsive'>
          <table className='table table-striped table-bordered'>
            <tbody>
              <tr>
                <th>IP</th>
                <td>{data.clientIP ?? data.locationData?.ip ?? data.ip ?? '—'}</td>
              </tr>
              <tr>
                <th>País</th>
                <td>{data.locationData?.country_name ?? '—'}</td>
              </tr>
              <tr>
                <th>Región</th>
                <td>{data.locationData?.region_name ?? '—'}</td>
              </tr>
              <tr>
                <th>Ciudad</th>
                <td>{data.locationData?.city_name ?? '—'}</td>
              </tr>
              <tr>
                <th>Compañía</th>
                <td>{formatCell(data.locationData?.isp ?? data.locationData?.as)}</td>
              </tr>
              <tr>
                <th>VPN</th>
                <td>
                  {data.proxy?.is_vpn == null
                    ? '—'
                    : data.proxy.is_vpn
                    ? 'Si'
                    : 'No'}
                </td>
              </tr>
              <tr>
                <th>TOR</th>
                <td>
                  {data.proxy?.is_tor == null
                    ? '—'
                    : data.proxy.is_tor
                    ? 'Si'
                    : 'No'}
                </td>
              </tr>
              <tr>
                <th>Spammer</th>
                <td>
                  {data.proxy?.is_spammer == null
                    ? '—'
                    : data.proxy.is_spammer
                    ? 'Si'
                    : 'No'}
                </td>
              </tr>
              <tr>
                <th>Scanner</th>
                <td>
                  {data.proxy?.is_scanner == null
                    ? '—'
                    : data.proxy.is_scanner
                    ? 'Si'
                    : 'No'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
