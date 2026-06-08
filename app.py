import streamlit as st
import pandas as pd
import geopandas as gpd  # Corrigido: Faltava importar o geopandas
from streamlit_folium import folium_static
import folium

# Configuração da página (Deve ser a primeira linha do Streamlit a ser executada)
PAGE_CONFIG = {"page_title": "Dashboard temático com Streamlit", "page_icon": ":heart:", "layout": "centered"}
st.set_page_config(**PAGE_CONFIG)

# Carregamento dos dados (feito uma única vez fora da função main para otimizar)
url_ext_mineral = 'Extracao_Mineral_-_Mapeamento_por_radar_1_10.000_0.geojson'
url_municipios = 'pr_mun.geojson'

polygons = gpd.read_file(url_ext_mineral)
points = gpd.read_file(url_municipios)

def main():
    st.title("Como adicionar mapas no StreamLit")
    st.subheader("Baseado num caderno do Colab")
    
    menu = ["Home", "Mapa"]
    choice = st.sidebar.selectbox('Menu', menu)
    
    if choice == 'Home':
        st.subheader("Página Inicial 1")
        
    elif choice == 'Mapa':
        st.subheader("Visualizar Mapa")

        # LINHA DE DIAGNÓSTICO TEMPORÁRIA:
        # Isso vai desenhar a tabela de dados na tela do seu app para você ver os nomes das colunas
        st.write("Colunas disponíveis no arquivo:", polygons.columns.tolist())
        st.dataframe(polygons.head(3))
        
        # O bloco 'with st.echo()' mostra o código na tela enquanto o executa. 
        # Toda a indentação interna dele foi corrigida.
        with st.echo():
            # Criação do mapa com Folium
            m = folium.Map(location=[-25.5, -49.3], zoom_start=9)
            
            folium.Choropleth(
                geo_data=polygons.to_json(),  # Corrigido: mudado de bairros_finais para polygons
                name='Áreas de Extração Mineral',
                data=polygons,                # Corrigido: mudado de bairros_finais para polygons
                columns=['NOME_DA_COLUNA_ID', 'NOME_DA_COLUNA_DADO'],
                key_on='feature.properties.NOME_DA_COLUNA_ID'',
                fill_color='YlGn',
                legend_name='Extração Mineral'
            ).add_to(m)
            
            folium.LayerControl().add_to(m)
            folium_static(m)

if __name__ == '__main__':
    main()
