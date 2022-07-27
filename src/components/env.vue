<script>
import { globalConfig } from '../stores/global-config.js'

const api_url = globalConfig.apiUrl
const image_url = api_url + 'image/image?pid='
const cover_url = api_url + 'album/cover?albumId='
export default({
    api_url,
    image_url,
    cover_url,
})
</script>
